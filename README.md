# ChatApp

A real-time chat application built with the MERN stack and Socket.IO.

## About

ChatApp is a full-stack real-time messaging application designed for simple and responsive communication. It includes secure user authentication, real-time messaging, online user tracking, and persistent message storage.

### Tech Used

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, Zustand
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Real-Time:** Socket.IO
- **Authentication:** JWT, HTTP-only cookies, bcrypt

**Live Demo:** https://chatapp-37wh.onrender.com

## Features

- User signup and login
- Real-time messaging with Socket.IO
- Online user status
- JWT authentication with HTTP-only cookies
- MongoDB message storage
- Responsive chat UI

## Run Locally

### 1. Fork and clone

Fork this repository, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/ChatApp.git
cd ChatApp
```

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

### 3. Create `.env`

In the root folder:

```env
MONGO_DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

### 4. Start the app

Backend:

```bash
npm run server
```

Frontend:

```bash
cd frontend
npm run dev
```

Then open the local URL shown by Vite.

## Project Structure

```
ChatApp/
├── backend/
├── frontend/
├── package.json
└── README.md
```

## Author

Atmika Nayak
