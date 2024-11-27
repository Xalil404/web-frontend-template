// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // useLocation to get current location

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Assuming auth token is stored in localStorage
    const location = useLocation(); // Get the current location of the user

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If authenticated, render the children (private route content)
    return children;
};

export default PrivateRoute;
