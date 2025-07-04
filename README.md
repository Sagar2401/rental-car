# Vehicle Rental App

This project is a full-stack application for renting vehicles. It includes a React client and a Node.js/Express server with a PostgreSQL database.

## Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL

## Setup Instructions

### Server

1.  **Navigate to the server directory:**

    ```sh
    cd server
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up the database:**

    - Create a `.env` file in the `server` directory.
    - Add your PostgreSQL database URL to the `.env` file:
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```
    - Apply the database schema:
      ```sh
      npx prisma db push
      ```
    - Seed the database with initial data:
      ```sh
      npm run seed
      ```

4.  **Run the server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### Client

1.  **Navigate to the client directory:**

    ```sh
    cd client
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the client:**
    ```sh
    npm run dev
    ```
    The client will be running on `http://localhost:5173`.

---
