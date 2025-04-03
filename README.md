# MERN Project with Map

## Project Overview
This is a full-stack web application built using the **MERN (MongoDB, Express, React, Node.js)** stack. The project utilizes **Context API** for global state management.

##  Features
- User authentication (JWT-based login/signup)
- CRUD operations with MongoDB
- Context API for managing global state
- Protected routes with authentication
- Responsive UI with Tailwind CSS
- RESTful API with Express.js
- Error handling and validation
- Geocoding using OpenCage API
- Displaying addresses on a map using Leaflet

## 🛠️ Tech Stack
### Frontend:
- React.js
- React Router
- Context API
- Tailwind CSS
- Leaflet (for map visualization)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- OpenCage API (for geocoding)

## 🔧 Installation & Setup
### 1️⃣ Clone the repository:
```sh
git clone https://github.com/vai-sys/Map-Profile.git
cd Map-Profile
```
### 2️⃣ Install dependencies:
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
```sh
cd backend
npm install
```
### 3️⃣ Configure environment variables:
Create a `.env` file in the root of the **server** folder and add the following:
```env
MONGO_URI=mongodb string
JWT_SECRET=jwt secrete
PORT=3000
OPENCAGE_API_KEY=api_key
```

### 4️⃣ Run the application:
#### Backend:
```sh
cd backend
npm start
```
#### Frontend:
```sh
cd frontend
npm start
```

## 🎯 API Endpoints
### Authentication:
| Method | Endpoint        | Description          |
|--------|---------------|----------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | User login          |

### CRUD Operations:
| Method | Endpoint        | Description          |
|--------|---------------|----------------------|
| GET    | /api/profiles     | Get all profiles      |
| POST   | /api/profiles     | Create a new profile    |
| PUT    | /api/profiles/:id | Update a profile      |
| DELETE | /api/profiles/:id | Delete a profile       |



- **OpenCage API** is used for converting addresses into latitude and longitude.
- **Leaflet** is used to display the location on a map.

![Screenshot 2025-04-03 165647](https://github.com/user-attachments/assets/0ea1030e-063a-4659-b310-15e6940d10a7)
![Screenshot 2025-04-03 165629](https://github.com/user-attachments/assets/84d3a86e-7f3f-4383-953e-74cdc7eca6c4)
![Screenshot 2025-04-03 165249](https://github.com/user-attachments/assets/869271e0-d05a-4217-8bc6-2416b34c606f)
![Screenshot 2025-04-03 171541](https://github.com/user-attachments/assets/bd5a9d5b-150e-4a1f-9ab1-12cbc4ec3f8e)
