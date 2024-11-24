// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
//import Login from './components/auth/Login';
//import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
//import Logout from './components/auth/Logout'; 
import NotFound from './components/NotFound';
import Contact from './components/Contact'; 
import Profile from './components/Profile'; 
import FirebaseLogin from "./components/auth/FirebaseLogin";
import FirebaseRegister from "./components/auth/FirebaseRegister";
import PrivateRoute from './components/auth/PrivateRoute';


const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/firebaselogin" element={<FirebaseLogin />} /> {/* Use FirebaseLogin component */}
                <Route path="/firebaseregister" element={<FirebaseRegister />} /> {/* Use FirebaseRegister component */}
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
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                /> 
            </Routes>
        </Router>
    );
};

export default App;
