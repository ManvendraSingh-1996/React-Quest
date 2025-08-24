# React + Vite

# React App with PocketBase

A React application featuring user authentication, protected routes, and a dashboard interface, powered by PocketBase backend.

## Features

- **User Authentication** (Login/Register)
- **Protected Routes** with React Router
- **Context-based State Management**
- **Responsive Dashboard** with toggle sidebar
- **PocketBase Integration** for backend services
- **Modern UI** with Tailwind CSS and Lucide React icons

## Tech Stack

- **Frontend**: React, React Router DOM, Tailwind CSS, Lucide React, toaster
- **Backend**: PocketBase
- **State Management**: React Context API
- **Build Tool**: Vite

## Project Structure

```
src/
├── assets/
│   └── images/
│         └──  profile.png
├── components/
│   ├── ProtectedRoutes.jsx
│   └── TermsCondition.jsx
├── config/
│   └── navList.js
├── contexts/
│   └── AuthContext.jsx
├── lib/
│   └── pocketbase.js
├── views/
│   ├── Dashboard.jsx
│     ├── Login.jsx
│   └── Signup.jsx
├── App.jsx
└── main.jsx
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git (for cloning the repository) or code can be downloaded

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd React-Quest
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Test Credentials

Use the provided test credentials to explore the application:

- **PocketBase Admin Panel**: https://pb.devpgs.app/_/

### Application Flow

1. **Landing Page**: Users are redirected to login if not authenticated
2. **Register**: New users can create accounts
3. **Login**: Existing users can authenticate
4. **Dashboard**: Protected page accessible only to authenticated users
5. **Logout**: Users can securely log out and return to the login page

## PocketBase Integration Issues & Assumptions

### Issues Encountered

1. **Collection Confusion**
   - The provided PocketBase instance (`https://pb.devpgs.app`) contained two collections:
     - `pocketbase_auth` (default system collection)
     - `users` (custom collection)
2. **Local Development Discovery**

   - When downloading the PocketBase executable to run a local server:
     - A new browser tab automatically opened requesting super user creation
     - After creating the super user and logging in, I found the `users` collection
     - User signup details were successfully visible in the `users` collection

3. **Authentication Collection Selection**
   - **Assumption**: Using the `users` collection for authentication instead of the default `pocketbase_auth`
   - This allows for custom user fields and was able to create user record.

### Assumptions Made

1. **User Collection Structure**

   ```javascript
   {
    username: "string",
    email: "string",
    password: "string",  //(min 8 characters required in pocketbase auth)
    passwordConfirm: "string",
    emailVisibility: true,
   }
   ```

2. **Authentication Flow**

   - Users register/login using email and password
   - PocketBase handles password hashing and validation
   - Automatic token refresh is handled by PocketBase SDK

3. **Protected Routes**
   - Dashboard require valid authentication
   - Unauthenticated users are redirected to login page
   - Authentication state persists across browser sessions

## Features Implemented

### Authentication Context

- Centralized state management for user authentication using Context
- Automatic token validation and refresh
- Login/logout functionality
- User session persistence

### Protected Routes

- Route guards using React Router
- Automatic redirection for unauthenticated users
- Seamless navigation for authenticated users

### Dashboard Features

- Responsive sidebar with toggle functionality
- Modern UI components
- User profile display
- Logout functionality
- Mobile-optimized design
- toaster for notification /feedback

## API Integration

The application integrates with PocketBase using the official JavaScript SDK:

```javascript
// Example PocketBase configuration
import PocketBase from "pocketbase";

const pb = new PocketBase("https://pb.devpgs.app");

// Authentication methods used
await pb.collection("users").authWithPassword(email, password);
await pb.collection("users").create(userData); // was getting issue this way then tries using POST request
pb.authStore.clear(); // Logout
```

## Development Notes

### Future Enhancements

- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Role-based access control
- [ ] Real-time updates using PocketBase subscriptions

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure PocketBase allows your development origin
   - Check if the PocketBase URL is correct in environment variables

2. **Authentication Failures**

   - Verify the `users` collection exists and has proper auth configuration
   - Check if auth methods are enabled in PocketBase admin panel

3. **Route Protection Not Working**
   - Ensure AuthContext is properly wrapped around your app
   - Verify token validation logic in the context

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
