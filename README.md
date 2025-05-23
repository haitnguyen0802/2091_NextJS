# Next.js E-commerce Authentication System

This project includes a complete authentication system with registration, email verification, and login functionality.

## Features

- User registration with bcrypt password hashing
- Email verification with activation links
- Account activation with timestamp updates
- Login system with secure password verification
- Responsive UI with modern design

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the email service:
   - Open `app/api/send-activation-email/route.ts`
   - Replace password placeholders with your actual Gmail App Password
   - Email service uses: marketingemail.test1@gmail.com

4. Run the development server:
   ```
   npm run dev
   ```

## Email Configuration

The system uses Nodemailer with Gmail to send activation emails. To set up:

1. You need to create an App Password for the Gmail account:
   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Create an App Password for "Mail" and "Other (Custom name)"
   - Copy the generated 16-character password

2. Replace the placeholder in the code:
   ```javascript
   auth: {
     user: 'marketingemail.test1@gmail.com',
     pass: 'YOUR_APP_PASSWORD_HERE' // Replace the placeholder with this
   }
   ```

## Account Activation System

- When a user registers, they receive an activation email with a unique token
- Clicking the activation link updates the user record with:
  - email_verified_at: timestamp
  - remember_token: the activation token
  - created_at: timestamp
- Users cannot log in until their email is verified
- The system provides success and error pages for the activation process

## API Endpoints

- `POST /api/send-activation-email`: Sends account activation emails
- `GET /api/activate-account`: Activates a user account with the provided token

## Technologies Used

- Next.js
- React
- bcryptjs for password hashing and token generation
- Nodemailer for email sending
- Bootstrap for UI components

## Project Structure

The project is divided into two main parts:
- **Frontend**: Next.js application
- **Backend**: API that will be implemented separately

## Backend Integration

The frontend is prepared to work with a RESTful backend API. The following files have been created to facilitate the backend implementation:

1. **`app/services/api.ts`**: Service layer for making API calls
2. **`backend-requirements.md`**: Analysis of the frontend and required backend endpoints
3. **`backend-database-schema.md`**: Database schema design for the backend
4. **`backend-setup.md`**: Instructions for setting up the backend

## Getting Started

### Frontend Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser.

### Backend Development

Follow the instructions in `backend-setup.md` to set up the backend API.

## Current Features

- Product listings with filtering and pagination
- Product detail pages
- Shopping cart functionality
- User authentication (currently using localStorage)
- Checkout process
- Responsive design

## Backend Requirements

The backend needs to implement the following API endpoints:

1. **Authentication API**:
   - Register, Login, Logout
   - User profile management

2. **Product API**:
   - Get products with filtering and pagination
   - Get product details
   - Get products by category

3. **Cart API**:
   - Add/remove/update cart items

4. **Order API**:
   - Create orders
   - Get order history

5. **Category API**:
   - Get all categories

For detailed requirements, refer to `backend-requirements.md`.

## Database Schema

The proposed database schema includes tables for:
- Users
- Products
- Categories
- Orders
- Order Details
- Carts and Cart Items

For the complete schema, refer to `backend-database-schema.md`.

## Contributing

1. Clone the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   2 0 9 1 _ N e x t J S 
 
 