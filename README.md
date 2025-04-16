# E-commerce Next.js Application

This repository contains a fully functional e-commerce application built with Next.js and React.

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