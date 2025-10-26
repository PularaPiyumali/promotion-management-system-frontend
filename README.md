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

<img width="1878" height="872" alt="Screenshot 2025-10-26 084128" src="https://github.com/user-attachments/assets/10fe6ce5-e9f0-45bb-9880-1d860e32552e" />


Admin Dashboard

<img width="1880" height="863" alt="Screenshot 2025-10-26 084055" src="https://github.com/user-attachments/assets/9b68f69d-9e82-4c8b-934e-413715a138e3" />



<img width="1877" height="861" alt="Screenshot 2025-10-26 085954" src="https://github.com/user-attachments/assets/a7e06afe-235b-499c-be4e-a27c043cd92f" />


User Dashboard

<img width="1883" height="865" alt="Screenshot 2025-10-26 090012" src="https://github.com/user-attachments/assets/882ba45b-9430-4bde-ab9d-90efe812f876" />


Create Users (Admin)

<img width="1871" height="854" alt="Screenshot 2025-10-26 084215" src="https://github.com/user-attachments/assets/ca779bf6-2799-408a-8d1a-c0c594a2b22d" />


Edit Users (Admin)

<img width="1863" height="857" alt="Screenshot 2025-10-26 084237" src="https://github.com/user-attachments/assets/c50552b9-fecc-4161-8ab9-563873a11517" />


Create Promotions (Admin/User)

<img width="1875" height="856" alt="Screenshot 2025-10-26 084405" src="https://github.com/user-attachments/assets/b78fb5e7-0046-432c-b5ec-f0192a8e568a" />


Edit Promotion (Admin/User)

<img width="1888" height="858" alt="Screenshot 2025-10-26 084433" src="https://github.com/user-attachments/assets/2fa64cbb-2997-429f-a929-c5bd6be74302" />

