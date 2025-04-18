# IDE-X

**IDE-X** is a full-stack web application inspired by platforms like CodePen. It allows users to create, save and share code snippets in real-time. The app provides a seamless coding experience with features like live previews, dark mode, secure authentication, and GitHub OAuth login.

Live App (IDE-X) >>> [click here] (https://ide-x.vercel.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Run Application](#run-application)
- [Environment Variables](#environment-variables)

---

## Features

### Core Features

- **User Authentication**:
  - Secure registration and login using JWT (JSON Web Tokens).
  - Password reset functionality via email.
  - Password strength validation during registration and password reset.
  - GitHub OAuth login for seamless authentication.
- **Code Editor**:
  - Monaco Editor integration for HTML, CSS, and JavaScript editing.
  - Real-time preview of code changes in an iframe.
  - Save and update snippets with titles.
- **Snippet Management**:
  - View, edit, and delete saved snippets.
  - Export snippets as `.html`, `.css`, or `.js` files with custom filenames.
  - Share snippets via unique URLs.
- **Dark Mode**:
  - Toggle between light and dark themes.
  - Persistent theme preference stored in `localStorage`.

### Additional Features

- **Error Handling**:
  - Toast notifications for success and error messages.
- **Responsive Design**:
  - Fully responsive UI built with TailwindCSS.
- **Session Persistence**:
  - User sessions are persisted across page reloads using cookies and MongoDB session storage.

---

## Tech Stack

### Backend

(\*\*Inspect package.json for more information\*\*)

- **Node.js**: Runtime environment for the server.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user data and snippets.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure user authentication.
- **Passport.js**: For handling authentication strategies (e.g., GitHub OAuth).
- **Nodemailer**: For sending password reset emails.
- **connect-mongo**: For session storage in MongoDB.
- **CORS**: For handling cross-origin requests.

### Frontend

- **React.js**: Frontend library for building the UI.
- **React Router**: For client-side routing.
- **Monaco Editor**: Code editor component.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **React Toastify**: For displaying toast notifications.
- **React Context**: For managing global state (e.g., authentication).

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js (v18 or higher) installed. You can download it from [here](https://nodejs.org/).
2. **MongoDB**: Set up a MongoDB instance (local or cloud-based like MongoDB Atlas).
3. **GitHub OAuth App**: Create a GitHub OAuth app to enable GitHub login.
4. **Email Service**: Use an email service (e.g., Gmail) for sending password reset emails.

### Run Application

1. Clone the repository:
   ```bash
   git clone https://github.com/nowshad-islam-dev/ide-x.git
   cd ide-x/server
   npm install
   npm start Or npm run dev
   cd ../client
   npm install
   npm run dev
   ```
   **Warning**: Don't forget to setup your database locally and change the proxy of backend api as needed (vite.config.js)

## Environment Variables

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_specific_password
```

**Warning** : Change the baseURL in axiosInstance while running locally(axiosInstance.js)
