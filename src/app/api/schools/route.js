import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import fs from 'fs/promises'
import path from 'path'


// Handle POST request to add a new school
export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name')
    const address = formData.get('address')
    const city = formData.get('city')
    const state = formData.get('state')
    const contact = formData.get('contact')
    const email_id = formData.get('email_id')
    const image = formData.get('image')

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate contact number (should be numeric and reasonable length)
    const contactNumber = parseInt(contact)
    if (isNaN(contactNumber) || contactNumber < 1000000000 || contactNumber > 9999999999) {
      return NextResponse.json(
        { error: 'Contact number should be a valid 10-digit number' },
        { status: 400 }
      )
    }

    let imagePath = ''

    // Handle image upload
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Create unique filename
      const originalName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
      const timestamp = Date.now()
      const filename = `${timestamp}_${originalName}`
      
      // Ensure the schoolImages directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages')
      try {
        await fs.access(uploadDir)
      } catch {
        await fs.mkdir(uploadDir, { recursive: true })
      }
      
      // Save the image
      const filepath = path.join(uploadDir, filename)
      await fs.writeFile(filepath, buffer)
      imagePath = `/schoolImages/${filename}`

    }

    // Insert into database
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contactNumber, imagePath, email_id]
    )

    return NextResponse.json(
      { 
        message: 'School added successfully',
        schoolId: result.insertId,
        imagePath: imagePath
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error adding school:', error)
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    )
  }
}

// Handle GET request to fetch all schools
export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
    )

    return NextResponse.json(
      { schools: rows },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}