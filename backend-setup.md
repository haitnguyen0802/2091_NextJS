# E-commerce Backend Setup Instructions

This document provides instructions for setting up the backend for the Next.js e-commerce application.

## Technology Stack Recommendations

1. **Language**: PHP, Node.js, or Python
2. **Framework Options**:
   - PHP: Laravel, Symfony
   - Node.js: Express, NestJS
   - Python: Django, FastAPI
3. **Database**: MySQL or PostgreSQL
4. **Authentication**: JWT (JSON Web Tokens)

## Laravel Backend Setup (Recommended)

Laravel provides a robust framework for building RESTful APIs and has excellent integration with relational databases.

### Prerequisites

- PHP >= 8.1
- Composer
- MySQL or PostgreSQL
- Node.js and npm (for frontend)

### Step 1: Install Laravel

```bash
composer create-project laravel/laravel ecommerce-api
cd ecommerce-api
```

### Step 2: Configure Database

1. Edit the `.env` file to set up your database connection:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

2. Create the database:

```bash
mysql -u root -p -e "CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Step 3: Run Migrations

Create migrations for the database tables defined in `backend-database-schema.md`. For example:

```bash
php artisan make:migration create_users_table
php artisan make:migration create_categories_table
php artisan make:migration create_products_table
# ... Create other necessary migrations

# After creating all migrations:
php artisan migrate
```

### Step 4: Create Models

Create Eloquent models for each table:

```bash
php artisan make:model User
php artisan make:model Category
php artisan make:model Product
php artisan make:model Order
php artisan make:model OrderDetail
# ... Create other necessary models
```

### Step 5: Implement Authentication

1. Install Laravel Sanctum for API authentication:

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

2. Configure Auth controllers for login, register, and profile management.

### Step 6: Create API Routes

Define your API routes in `routes/api.php`:

```php
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::put('/change-password', [AuthController::class, 'changePassword']);
    });
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
Route::get('/products/search', [ProductController::class, 'search']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/categories/{id}/products', [CategoryController::class, 'products']);

Route::middleware('auth:sanctum')->group(function () {
    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::put('/cart/items/{id}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{id}', [CartController::class, 'removeItem']);
    Route::delete('/cart', [CartController::class, 'clear']);
    
    // Order routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
```

### Step 7: Implement Controllers

Create controllers for each resource:

```bash
php artisan make:controller AuthController
php artisan make:controller ProductController --resource
php artisan make:controller CategoryController --resource
php artisan make:controller CartController
php artisan make:controller OrderController
```

### Step 8: Configure CORS

1. Update the CORS configuration in `config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3001'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

2. If using Sanctum, add the frontend URL in `config/sanctum.php`:

```php
'stateful' => [
    'localhost:3001',
    // ...other domains
],
```

### Step 9: Add Data Seeders

Create seeders to populate the database with sample data:

```bash
php artisan make:seeder CategorySeeder
php artisan make:seeder ProductSeeder
php artisan make:seeder UserSeeder
```

### Step 10: Run the Application

```bash
php artisan serve --port=8000
```

Your API will be available at `http://localhost:8000/api`.

## Express.js Backend Setup (Alternative)

If you prefer Node.js, you can set up an Express.js backend:

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MySQL or PostgreSQL

### Step 1: Initialize a New Project

```bash
mkdir ecommerce-api
cd ecommerce-api
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express cors dotenv bcrypt jsonwebtoken sequelize mysql2 multer
npm install -D nodemon typescript ts-node @types/express @types/node
```

### Step 3: Set Up TypeScript

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Step 4: Create Database Models with Sequelize

Set up models for all database tables.

### Step 5: Create API Routes and Controllers

Implement API endpoints as outlined in the requirements document.

### Step 6: Run the Application

```bash
npm run dev
```

## Connecting the Frontend to Backend

1. Update the `.env` file in your Next.js frontend to point to the backend API:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

2. Update your frontend code to use the API service you've created in `app/services/api.ts`.

3. Test all API endpoints to ensure they work correctly with the frontend.

## Deployment Considerations

1. Set up a production database with proper security measures
2. Configure environment variables for production
3. Set up SSL/TLS for secure API communication
4. Consider using Docker for containerization
5. Use a proper hosting service (Vercel, Heroku, AWS, etc.)
6. Set up CI/CD for automated deployments
7. Configure proper error logging and monitoring 