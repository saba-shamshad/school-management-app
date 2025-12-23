import { NextResponse } from 'next/server'
import pool from '@/lib/db'

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

    let imageData = null

    // ✅ Convert image to Base64
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageData = `data:${image.type};base64,${buffer.toString('base64')}`
    }

    await pool.execute(
      `INSERT INTO schools 
      (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageData, email_id]
    )

    return NextResponse.json(
      { message: 'School added successfully' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error adding school:', error)
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 })
  }
}

export async function GET() {
  const [rows] = await pool.execute(
    'SELECT * FROM schools ORDER BY created_at DESC'
  )
  return NextResponse.json({ schools: rows })
}
