import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// Handle POST request to add a new school
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate contact number (should be numeric and reasonable length)
    const contactNumber = parseInt(contact);
    if (
      isNaN(contactNumber) ||
      contactNumber < 1000000000 ||
      contactNumber > 9999999999
    ) {
      return NextResponse.json(
        { error: "Contact number should be a valid 10-digit number" },
        { status: 400 }
      );
    }

    let imageBase64 = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const mimeType = image.type; // image/jpeg, image/png
      const base64 = buffer.toString("base64");

      imageBase64 = `data:${mimeType};base64,${base64}`;
    }

    // Insert into database
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contactNumber, imageBase64, email_id]
    );

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "School added successfully",
        schoolId: result.insertId,
        imagePath,
      }),
      {
        status: 200, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { error: "Failed to add school" },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch all schools
export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC"
    );

    return NextResponse.json({ schools: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
