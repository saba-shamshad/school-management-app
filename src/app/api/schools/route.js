import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name')
    const address = formData.get('address')
    const city = formData.get('city')
    const state = formData.get('state')
    const contact = formData.get('contact')
    const email_id = formData.get('email_id')
    const image = formData.get('image')

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    let imagePath = '/placeholder-school.jpg'

    // 🔒 SAFE image handling (Railway friendly)
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = `${Date.now()}_${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
        const uploadDir = path.join(process.cwd(), 'public', 'schoolImages')

        await fs.mkdir(uploadDir, { recursive: true })
        await fs.writeFile(path.join(uploadDir, filename), buffer)

        imagePath = `/schoolImages/${filename}`
      } catch (imgErr) {
        console.error('Image upload failed, using placeholder:', imgErr)
      }
    }

    // ✅ INSERT ALWAYS HAPPENS
    await pool.execute(
      `INSERT INTO schools 
      (name, address, city, state, contact, image, email_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imagePath, email_id]
    )

    // ✅ ALWAYS SUCCESS RESPONSE
    return NextResponse.json(
      { message: 'School added successfully' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Fatal error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const [rows] = await pool.execute(
    'SELECT * FROM schools ORDER BY created_at DESC'
  )
  return NextResponse.json({ schools: rows })
}
