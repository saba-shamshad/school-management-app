'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ShowSchools() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools')
      const data = await response.json()

      if (response.ok) {
        setSchools(data.schools)
      } else {
        setError(data.error || 'Failed to fetch schools')
      }
    } catch (error) {
      console.error('Error fetching schools:', error)
      setError('An error occurred while fetching schools')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading schools...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#dc3545',
          fontSize: '1.2rem'
        }}>
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Our Schools
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>
          Discover educational institutions in your area
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <a 
          href="/addSchool" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0070f3'}
        >
          Add New School
        </a>
      </div>

      {schools.length === 0 ? (
        <div className="no-schools">
          <h2>No schools found</h2>
          <p>Be the first to add a school to our database!</p>
          <a 
            href="/addSchool" 
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Add First School
          </a>
        </div>
      ) : (
        <div className="schools-grid">
          {schools.map((school) => (
            <div key={school.id} className="school-card">
              {/* School Image */}
              {school.image ? (
                <img 
                  src={school.image} 
                  alt={school.name}
                  className="school-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-school.jpg'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '0.9rem'
                }}>
                  No Image Available
                </div>
              )}

              {/* School Information */}
              <div className="school-info">
                <h3 className="school-name">
                  {school.name}
                </h3>
                
                <div className="school-address">
                  <strong>Address:</strong><br />
                  {school.address}
                </div>
                
                <div className="school-city">
                  <strong>City:</strong> {school.city}, {school.state}
                </div>

                {/* Additional Info (hidden by default, but available if needed) */}
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    <strong>Contact:</strong> {school.contact}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                    <strong>Email:</strong> {school.email_id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}