# Blog API with Authentication

A RESTful API for managing blogs with user authentication, built with Node.js, Express, MongoDB, and JWT.

---

## Features

- User registration and login with password hashing (bcrypt)
- JWT-based authentication and protected routes
- CRUD operations for blogs:
  - Create, read, update, delete blogs
  - Filter blogs by title and tags
  - Pagination and sorting support
- Blog comments support (embedded in blog documents)

---

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- dotenv for environment variables
- morgan for logging HTTP requests

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (local or cloud, e.g., MongoDB Atlas)
- A tool like Postman to test API endpoints

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumangotame/blog-api.git
   cd blog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root and add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000` by default.

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description        | Request Body                         |
|--------|-----------------|--------------------|------------------------------------|
| POST   | `/api/auth/register` | Register new user  | `{ "username": "user", "password": "pass" }` |
| POST   | `/api/auth/login`    | User login        | `{ "username": "user", "password": "pass" }` |

### Blogs

> **Note:** Protected routes require an `Authorization` header with the value:  
> `Bearer <token>`

| Method | Endpoint            | Description                        | Request Body / Query Parameters                                     |
|--------|---------------------|----------------------------------|--------------------------------------------------------------------|
| GET    | `/api/blogs`         | Get all blogs                    | Query params: `title`, `tag`, `sortBy` (`asc` or `desc`), `page`, `limit` |
| POST   | `/api/blogs`         | Create a new blog (protected)    | `{ "title": "Title", "description": "Desc", "tags": ["tag1","tag2"] }`     |
| GET    | `/api/blogs/:id`     | Get blog by ID                   |                                                                    |
| PUT    | `/api/blogs/:id`     | Update blog by ID (protected)    | Partial or full blog fields                                        |
| DELETE | `/api/blogs/:id`     | Delete blog by ID (protected)    |                                                                    |

---

## Middleware

- **Authentication middleware** protects certain routes by verifying JWT tokens.

---

## Folder Structure

```
/config
  db.js           # MongoDB connection
/controllers
  authController.js
  blogController.js
/middleware
  authMiddleware.js
/models
  Blog.js
  User.js
/routes
  authRoutes.js
  blogRoutes.js
server.js
.env
README.md
```

---

## Notes

- Passwords are securely hashed using bcrypt before storing in the database.
- JWT tokens expire after 2 days.
- MongoDB connection URI and JWT secret must be set in environment variables.
- Use Postman or similar to test API endpoints.

---

## License

This project is open source and free to use.
