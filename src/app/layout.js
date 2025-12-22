import './globals.css'

export const metadata = {
  title: 'School Management System',
  description: 'A simple school management application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          backgroundColor: '#0070f3',
          padding: '1rem',
          color: 'white',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center'
        }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="/addSchool" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Add School</a>
          <a href="/showSchools" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Show Schools</a>
        </nav>
        {children}
      </body>
    </html>
  )
}