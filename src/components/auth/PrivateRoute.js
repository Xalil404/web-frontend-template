import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Adjust the import path for your Firebase setup

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); // Clean up the listener
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
