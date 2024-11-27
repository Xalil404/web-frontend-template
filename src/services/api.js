// src/services/api.js
import axios from 'axios';

// api.js
const AUTH_URL = 'https://django-backend-template-c4624bfe6451.herokuapp.com/auth/';  // Authentication base URL

// Register a new user
export const registerUser = async (username, email, password1, password2) => {
    try {
        const response = await fetch(`${AUTH_URL}registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password1, password2 }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Registration failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

// Login an existing user
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${AUTH_URL}login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Login failed');
        }

        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        return data;
    } catch (error) {
        throw error;
    }
};

// Logout the user (clear the auth token)
export const logoutUser = () => {
    localStorage.removeItem('authToken');
};


// Request a password reset
export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${AUTH_URL}password/reset/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Password reset request failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
