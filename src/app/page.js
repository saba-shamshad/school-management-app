export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>Welcome to School Management System</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        Use the navigation menu above to add schools or view existing schools.
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a 
          href="/addSchool" 
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Add New School
        </a>
        <a 
          href="/showSchools" 
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          View Schools
        </a>
      </div>
    </div>
  )
}