# 📚 Library Management System

## 🎯 Project Description

This project is designed as a library management system. Users can borrow books, return them, and rate books. Additionally, they can view and manage book information. The project is configured with a PostgreSQL database and Docker. It also includes features like authentication with JWT and image storage with Cloudinary.

## 🚀 Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (and npm)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. **Running the Project:**

   To run the project, first install the necessary npm packages and then start the project in development mode.

### Environment Variables

You need to add the following environment variables to your `.env` file:

```plaintext
POSTGRES_DB=exampledb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=exampleuser
POSTGRES_PASSWORD=examplepass

JWT_SECRET_KEY=my-secret
JWT_EXPIRES_IN=24h

CLOUDINARY_CLOUD_NAME=test
CLOUDINARY_API_KEY=test
CLOUDINARY_API_SECRET=test
CLOUDINARY_FOLDER_NAME=scaned-files
CLOUDINARY_IMAGE_BASE_NAME=moment
```

### After Docker is installed locally

```bash
docker-compose up
```

```bash
npm run dev
```

## 🛠️ Upcoming Features

1. **Role System Integration**
   - **Description:** The application will be updated to support different user roles. Access permissions will be defined according to roles, and role-based authorization will be implemented.

2. **Image Storage with Cloudinary**
   - **Description:** Book images will be stored on Cloudinary. This will facilitate the easy uploading and management of images.

3. **Book Author Integration**
   - **Description:** Author information will be added to books to enrich book details further. Relationships between authors and books will be managed.

## 📂 API Reference

**User Management**
- `POST /login`: Logs in a user and returns a JWT token.
- `POST /register`: Creates a new user registration.
- `PUT /user/`: Updates user information.
- `GET /:userId`: Getting target user information.

**Book Management**
- `POST /book`: Creates a new book.
- `POST /book/borrow/`: Borrows a book.
- `PUT /book/return/`: Returns a book.
- `GET /book`: Retrieves all books.
- `GET /book/{id}`: Retrieves details of a specific book.

**Book Borrowing**
- `POST /book/borrow/`: Borrows a book.
- `PUT /book/return/`: Returns a book and adds a rating.

## 🧩 Contributors

- İdris Demir - Project creator and developer

## 📄 License

This project is licensed under the MIT License. For more information, see the `LICENSE` file.
