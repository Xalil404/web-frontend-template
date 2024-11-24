import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";  // Import necessary Firebase services
import axios from 'axios';

// Function to get the Firebase ID token from localStorage
const getFirebaseToken = async () => {
    const auth = getAuth(); // Initialize auth
    const user = auth.currentUser;
    if (user) {
        const idToken = await getIdToken(user); // Get the token for the logged-in user
        return idToken;
    }
    return null;
};

// Axios instance with Firebase token in the Authorization header
const api = axios.create({
    baseURL: 'https://django-backend-template-c4624bfe6451.herokuapp.com/api', // Your API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const token = await getFirebaseToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Add token to the header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
