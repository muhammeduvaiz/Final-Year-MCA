# KSRTC User Authentication System

This document explains how the user authentication system works in the KSRTC project.

## Overview

The authentication system uses:
- **Frontend**: React with axios for API calls
- **Backend**: Node.js with Express and MongoDB
- **Authentication**: JWT tokens stored in HTTP-only cookies
- **Password Security**: bcrypt for password hashing
- **User Management**: Only admins can create and manage users

## User Registration

### Admin-Only User Creation
- **Admin Route**: `/manageusers` (Admin Dashboard)
- **Component**: `ManageUsers.js`
- **Backend Endpoint**: `POST /admin/addUser` (via admin controller)

### Registration Fields
- Name (required)
- Username (required, unique)
- Phone (required)
- Password (required)
- Confirm Password (required)
- Age (optional)
- Gender (optional - male/female/other)

## User Login

### Frontend Route
- **URL**: `/` (root)
- **Component**: `ULogin.js`

### Backend Endpoint
- **URL**: `POST /user/login`
- **Controller**: `userControllers.js` - `login` function

### Login Fields
- Username
- Password

## Authentication Middleware

### File: `authUsers.js`
- **Purpose**: Protects routes that require user authentication
- **Usage**: Add to any route that needs authentication
- **Token**: Reads from `req.cookies.token`
- **User Data**: Available as `req.user` in protected routes

### Example Protected Route
```javascript
const authUsers = require('./Middlewares/authUsers');

// Protected route
userRouter.get("/profile", authUsers, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});
```

## User Dashboard

### Frontend Route
- **URL**: `/dashboard`
- **Component**: `Dashboard.js`

### Features
- Displays user information (name, username)
- Navigation to other user features
- Logout functionality
- Authentication check (redirects to login if not authenticated)

## Admin User Management

### Admin Dashboard
- **URL**: `/adashboard`
- **Component**: `ADashboard.js`

### Manage Users
- **URL**: `/manageusers`
- **Component**: `ManageUsers.js`
- **Features**:
  - View all users
  - Add new users
  - Edit existing users
  - Delete users
  - Full CRUD operations

## User Model (MongoDB)

### Schema Fields
```javascript
{
    name: String (required),
    username: String (required, unique),
    password: String (required, hashed),
    confirmpassword: String (required),
    phone: String (required),
    age: Number (optional),
    gender: String (optional),
    isActive: Boolean (default: true),
    isDeleted: Boolean (default: false),
    createdAt: Date,
    updatedAt: Date
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure authentication tokens
3. **HTTP-only Cookies**: Tokens stored securely in cookies
4. **Input Validation**: Server-side validation for all inputs
5. **Account Status**: Support for active/inactive and deleted accounts
6. **Admin-Only User Creation**: Only administrators can create new users

## API Endpoints

### Public Endpoints
- `POST /user/login` - User login
- `POST /user/logout` - User logout

### Protected Endpoints
- `GET /user/profile` - Get user profile (requires authentication)

### Admin Endpoints
- `POST /admin/addUser` - Add new user (admin only)
- `GET /admin/getUsers` - Get all users (admin only)
- `PUT /admin/updateUser/:id` - Update user (admin only)
- `DELETE /admin/deleteUser/:id` - Delete user (admin only)

## Error Handling

The system provides clear error messages for:
- Missing required fields
- Password mismatch
- User not found
- Invalid credentials
- Account deactivated/deleted
- Invalid tokens
- Unauthorized access (admin-only features)

## Usage Flow

1. **Admin Creates User**: Admin logs in and creates user accounts via ManageUsers
2. **User Login**: User visits `/` and logs in with credentials provided by admin
3. **Authentication**: JWT token is stored in cookie
4. **Dashboard**: User is redirected to `/dashboard`
5. **Protected Routes**: User can access authenticated features
6. **Logout**: User logs out and token is cleared

## Testing

To test the authentication system:

1. Start the backend server: `cd backend && npm start`
2. Start the frontend: `npm start`
3. Login as admin: `http://localhost:3000/admin`
4. Create users via ManageUsers dashboard
5. Test user login: `http://localhost:3000/`
6. Test protected routes and logout functionality

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows frontend origin
2. **Cookie Issues**: Check cookie settings in browser
3. **Database Connection**: Verify MongoDB connection
4. **JWT Secret**: Ensure JWT_SECRET environment variable is set

### Debug Steps
1. Check browser console for frontend errors
2. Check server console for backend errors
3. Verify database connection
4. Test API endpoints with Postman
5. Check cookie storage in browser dev tools 