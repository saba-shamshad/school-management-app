# School Management System

A Next.js application for managing school data with MySQL database integration.

## Features

- Add new schools with image upload
- View all schools in an e-commerce style display
- Form validation using react-hook-form
- Responsive design for mobile and desktop
- MySQL database integration

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Start your MySQL server
2. Open MySQL command line or any MySQL client
3. Run the SQL commands from `database_setup.sql`:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS school_management;

-- Use the database
USE school_management;

-- Create the schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT NOT NULL,
    email_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure Database Connection

Edit `src/lib/db.js` and update the database credentials:

```javascript
const pool = mysql.createPool({
  host: 'localhost',     // Your MySQL host
  user: 'root',          // Your MySQL username
  password: '',          // Your MySQL password
  database: 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
school-management-app/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add School page
│   │   ├── api/schools/        # API routes
│   │   ├── showSchools/        # Show Schools page
│   │   ├── layout.js           # Layout component
│   │   ├── page.js             # Home page
│   │   └── globals.css         # Global styles
│   └── lib/
│       └── db.js               # Database connection
├── public/
│   ├── schoolImages/           # Uploaded school images
│   └── placeholder-school.jpg  # Default placeholder image
├── database_setup.sql          # Database setup script
├── package.json
└── README.md
```

## Pages

### 1. Home Page (`/`)
- Welcome page with navigation to other pages

### 2. Add School Page (`/addSchool`)
- Form to add new school information
- Image upload functionality
- Form validation for all fields
- Email validation
- Contact number validation (10 digits)

### 3. Show Schools Page (`/showSchools`)
- Display all schools in a grid layout
- Shows school name, address, city, and image
- Responsive design similar to e-commerce product display

## API Routes

### POST `/api/schools`
- Add a new school to the database
- Handles image upload to `public/schoolImages/`
- Validates all input fields

### GET `/api/schools`
- Retrieve all schools from the database
- Returns JSON with schools array

## Form Validation

The application includes comprehensive form validation:

- **School Name**: Required, minimum 3 characters
- **Address**: Required, minimum 10 characters
- **City**: Required, only letters and spaces
- **State**: Required, must select from dropdown
- **Contact**: Required, exactly 10 digits
- **Email**: Required, valid email format
- **Image**: Required, must select an image file

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Technologies Used

- Next.js 14
- React 18
- React Hook Form
- MySQL 2
- Multer (for file uploads)
- CSS3 for styling

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with default settings

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify

## Troubleshooting

### Database Connection Issues
- Make sure MySQL is running
- Check database credentials in `src/lib/db.js`
- Ensure the database and table exist

### Image Upload Issues
- Ensure the `public/schoolImages` directory exists
- Check file permissions
- Verify the uploaded file is an image

### Form Validation Errors
- Check the browser console for error messages
- Ensure all required fields are filled
- Verify email format and contact number format

## License

This project is created for educational purposes.