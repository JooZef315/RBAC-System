# RBAC System with JWT Authentication

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation and Usage](#installation-and-usage)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Project Structure](#project-structure)
6. [Best Practices](#best-practices)

## Introduction

This project implements a Role-Based Access Control (RBAC) system with JWT authentication using React for the frontend and Express for the backend. The system manages user roles and permissions, ensuring secure and appropriate access to various parts of the application.

## Features

- User Authentication (Login, Register)
- Role Management (Admin, User)
- Protected Routes Based on Roles
- JWT Token Handling with Refresh Tokens
- Responsive UI with Tailwind CSS

## Tech Stack

**Frontend:**

- React
- Zustand
- React Router v6
- Tailwind CSS
- Vite

**Backend:**

- Node.js
- Express
- Prisma ORM
- PostgreSQL

## Installation and Usage

### Backend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JooZef315/KNB-task.git
   cd KNB-task/server
   ```
2. **Install dependencies:**
   ```bash
    npm install
   ```
3. **Set up environment variables:**
   Create a .env file in the backend directory and add your database and JWT secret configurations.
   ```bash
    PORT=3001
    DATABASE_URL=
    ACCESS_TOKEN_SECRET =
    REFRESH_TOKEN_SECRET =
   ```
4. **Run Prisma migrations:**
   ```bash
    npx prisma migrate dev
    npx prisma generate
   ```
5. **Start the backend server:**
   ```bash
    npm run dev
   ```
   The backend server will be running at http://localhost:3001.

### Frontend

1. **Navigate to the frontend directory:**
   ```bash
    cd ../client
   ```
2. **Install dependencies:**
   ```bash
    npm install
   ```
3. **Start the Frontend server:**
   ```bash
   npm run dev
   ```
   The frontend server will be running at http://localhost:5173.

### Project Structure

    ├── server/
    │ ├── src/
    │ │ ├── controllers/
    │ │ ├── middleware/
    │ │ ├── services/
    │ │ ├── routes/
    │ │ ├── utils/
    │ │ ├── validators/
    │ │ └── index.ts
    │ │ └── types.ts
    │ ├── prisma/
    │ │ ├── migrations/
    │ │ └── schema.prisma
    │ ├── .env
    │ └── package.json
    │
    ├── client/
    │ ├── src/
    │ │ ├── components/
    │ │ ├── hooks/
    │ │ ├── pages/
    │ │ ├── store/
    │ │ ├── utils/
    │ │ ├── App.tsx
    │ │ ├── index.css
    │ │ └── main.tsx
    │ │ └── vite-env.d.ts
    │ ├── assets/
    │ ├── README.md
    │ ├── postcss.config.js
    │ ├── tailwind.config.js
    │ ├── tsconfig.app.json
    │ ├── tsconfig.json
    │ ├── tsconfig.node.json
    │ └── package.json
    │ └── vite.config.ts
    │
    └── README.md

### Best Practices

- Secure Token Storage: Use HTTP-only cookies for storing refresh tokens to prevent XSS attacks.
- State Management: Use Zustand for managing global state in a scalable way.
- Role-Based Access: Implement middleware on the backend to protect routes and ensure proper authorization.
