// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
//import Login from './components/auth/Login';
//import Register from './components/auth/Register';
//import Dashboard from './components/Dashboard';
//import Logout from './components/auth/Logout'; 
import NotFound from './components/NotFound';
import Contact from './components/Contact'; 


const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 Page */}
            </Routes>
        </Router>
    );
};

export default App;
