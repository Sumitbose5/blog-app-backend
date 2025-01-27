# Blog App Backend

This repository contains the backend code for a blog platform, built using **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for managing posts, comments, likes, and users.

## Features
- Create, view, and manage blog posts.
- Add comments to posts.
- Like or unlike posts.
- User creation and management.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-app-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ```
5. Start the server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:5000` by default.

## API Endpoints

### **Post Routes**

#### Create a Post
- **Endpoint:** `/posts/create`
- **Method:** `POST`
- **Description:** Creates a new blog post.
- **Request Body:**
  ```json
  {
    "username" : "<Username>",
    "title" : "<Title>",
    "body" : "<Add Description>"
  }
  ```

#### Get All Posts
- **Endpoint:** `/getPosts`
- **Method:** `GET`
- **Description:** Retrieves all blog posts.

#### Get Posts by Username
- **Endpoint:** `/getPosts/:username`
- **Method:** `GET`
- **Description:** Retrieves all posts created by a specific user.

### **Comment Routes**

#### Create a Comment
- **Endpoint:** `/comment/create`
- **Method:** `POST`
- **Description:** Adds a comment to a post.
- **Request Body:**
  ```json
  {
    "postID": "<Post ID>",
    "username" : "<USERNAME>",
    "yourComment": "Comment content"
  }
  ```

### **Like Routes**

#### Like a Post
- **Endpoint:** `/likes/like`
- **Method:** `POST`
- **Description:** Likes a post or removes a like if the user has already liked it.
- **Request Body:**
  ```json
  {
    "postID": "<Post ID>",
    "userID": "<User ID>"
  }
  ```

### **User Routes**

#### Create a User
- **Endpoint:** `/user/create`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**
  ```json
  {
    "username": "Username"
  }
  ```

## Tech Stack
- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB (Mongoose)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

