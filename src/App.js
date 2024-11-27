// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PasswordResetRequest from './components/auth/PasswordResetRequest';
import PasswordResetConfirm from './components/auth/PasswordResetConfirm';
import Dashboard from './components/Dashboard';
import Logout from './components/auth/Logout'; 
import NotFound from './components/NotFound';
import Contact from './components/Contact'; 
import PrivateRoute from './components/auth/PrivateRoute';


const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/auth/password/reset" element={<PasswordResetRequest />} />
                <Route path="/auth/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 Page */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                /> 
                <Route 
                    path="/logout" 
                    element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } 
                /> 
            </Routes>
        </Router>
    );
};

export default App;
