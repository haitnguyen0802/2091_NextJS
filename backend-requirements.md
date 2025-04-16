# Next.js Frontend Analysis and Backend Requirements

## Current Frontend Structure
- **Framework**: Next.js 15.2.2 with React 19.0.0
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API (AuthContext, CartContext, UserContext)

## API Endpoints Currently Used
The frontend is currently relying on the following API endpoints:

1. **Authentication API**:
   - `https://fpl.timefortea.io.vn/api/users` - User authentication and profile management

2. **Product API**:
   - `https://fpl.timefortea.io.vn/api/products` - Get all products
   - `https://fpl.timefortea.io.vn/api/products/{id}` - Get product by ID
   - `https://fpl.timefortea.io.vn/api/categories/{id}` - Get products by category

## Data Models

### User Model
```typescript
interface User {
    id: number;
    email: string;
    mat_khau: string; // password
    ho_ten: string;   // full name
    dia_chi: string;  // address
    dien_thoai: string; // phone
    vai_tro: number;  // role
    khoa: number;     // account status
    hinh: string;     // avatar
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string | null;
}
```

### Product Model
```typescript
interface Product {
    id: number;
    ten_sp: string;   // product name
    gia: number;      // price
    gia_km: number | null; // discount price
    hinh: string;     // image
    mo_ta: string;    // description
    id_loai: number;  // category id
    created_at: string | null;
    updated_at: string | null;
    slug?: string;    // product slug
}
```

### Cart Item Model
```typescript
interface CartItem {
    id: number;
    ten_sp: string;   // product name
    hinh: string;     // image
    gia: number;      // price
    gia_km: number | null; // discount price
    quantity: number; // quantity in cart
    slug?: string;    // product slug
}
```

## Backend Requirements

### 1. Authentication API
- **Register**: Create new user account
- **Login**: Authenticate user with email and password
- **Profile**: Get user profile information
- **Update Profile**: Update user details
- **Change Password**: Update user password

### 2. Product API
- **Products**: Get all products with pagination and sorting
  - Sorting options: popular, newest, price-low, price-high
- **Product Detail**: Get detailed information about a specific product
- **Product Categories**: Get products by category
- **Product Search**: Search products by name or description

### 3. Cart API
- **Add to Cart**: Add product to cart (currently managed client-side)
- **Update Cart**: Update product quantity in cart
- **Remove from Cart**: Remove product from cart
- **Get Cart**: Get current cart status

### 4. Checkout API
- **Create Order**: Submit order with cart items and shipping information
- **Payment Integration**: Process payment (could be integrated with payment gateway)
- **Order History**: Get user's order history
- **Order Detail**: Get detailed information about specific order

### 5. Category API
- **Categories**: Get all product categories

## Implementation Notes
1. The current frontend stores cart data in localStorage
2. Authentication is currently implemented with localStorage but should be properly implemented with JWT or session-based auth
3. The product listings support pagination and sorting
4. The backend should include proper error handling and validation
5. API responses should follow RESTful conventions

## Development Considerations
1. Set up a proper database (SQL recommended for relational product data)
2. Implement secure authentication with proper token management
3. Create middleware for route protection
4. Implement proper error handling and validation
5. Add logging mechanisms for debugging and monitoring
6. Set up proper CORS configuration to allow the frontend to communicate with the backend
7. Include proper documentation for API endpoints 