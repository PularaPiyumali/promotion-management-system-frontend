# Promotion Management System - Frontend

## Description

A ReactJS frontend application for the Promotion Management System. Provides a user-friendly interface for managing promotions, users, and authentication with role-based access for admins and regular users.

## Features

- User login and authentication with backend integration
- Admin and user dashboards
- Manage promotions (create, update, delete, view)
- Manage users (admin only)
- Form validation and error handling
- API communication with Spring Boot backend

## Tech Stack

- ReactJS
- React Router
- Axios
- Material-UI
- React Hooks
- Create React App

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (Spring Boot app on port 8080)

### Setup

1. Clone the repository:

   ```bash
   git clone <frontend-repo-url>

   ```

2. Navigate into the project folder:

   cd promotion-management-system-frontend

3. Install dependencies:

   npm install

   # or

   yarn install

4. Create a .env file in the root directory and configure your backend API URL:

   REACT_APP_API_URL=http://localhost:8080

5. Start the development server:

   npm start

   # or

   yarn start

6. Open your browser at:

   http://localhost:3000

### Folder Structure

promotion-management-system-frontend/
│
src/
│
├── components/ # Reusable UI components
│ ├── Button.jsx
│ ├── Input.jsx
│ ├── PromotionForm.jsx
│ ├── PromotionTable.jsx
│ ├── UserForm.jsx
│ └── UserTable.jsx
│
├── pages/ # Application pages
│ ├── AdminHome.jsx
│ ├── EditPromotionPage.jsx
│ ├── EditUserPage.jsx
│ ├── LoginPage.jsx
│ ├── Promotions.jsx
│ ├── RegisterPage.jsx
│ └── UserHome.jsx
│
├── services/ # API and Auth services
│ ├── api.js
│ ├── authService.js
│ └── index.js
│
├── App.js # Root application component
├── index.js # Entry point
├── .env.example # Environment variable template
└── .env.local # Local environment variables

### API Integration

The frontend communicates with the backend through REST APIs.
Below are the key endpoints it uses:

| Purpose               | Method   | Endpoint                                   |
| --------------------- | -------- | ------------------------------------------ |
| User Login            | `POST`   | `/users/login`                             |
| User Ceation/Registry | `POST`   | `/admins`                                  |
| Get All Promotions    | `GET`    | `/promotions`                              |
| Get Promotion By ID   | `GET`    | `/promotions/{id}`                         |
| Create Promotion      | `POST`   | `/promotions` _(multipart/form-data)_      |
| Update Promotion      | `PUT`    | `/promotions/{id}` _(multipart/form-data)_ |
| Delete Promotion      | `DELETE` | `/promotions/{id}`                         |
| Get All Users (Admin) | `GET`    | `/admins`                                  |
| Create User (Admin)   | `POST`   | `/admins`                                  |
| Update User (Admin)   | `PUT`    | `/admins/{id}`                             |
| Delete User (Admin)   | `DELETE` | `/admins/{id}`                             |

### UI Screenshots

Login Page

Register Page

Admin Dashboard

User Dashboard

Promotions List

Create/Edit Promotion

Create/Edit User (Admin)
