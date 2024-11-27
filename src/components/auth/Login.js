import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { GoogleOAuthProvider } from '@react-oauth/google'; // Add GoogleOAuthProvider for Google login
import { loginUser } from '../../services/api'; // Import your API call for email login

const Login = () => {
    const navigate = useNavigate();  // Create a navigate function
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset the error message
        setLoading(true); // Set loading to true while processing login

        try {
            const data = await loginUser(email, password);
            console.log(data); // Optional: Handle the login response
            setLoading(false); // Set loading to false after successful login

            // Redirect to the dashboard after successful login
            navigate('/dashboard');  // Use navigate() to redirect
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials and try again.');
            setLoading(false); // Set loading to false on error
        }
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div className="container mt-5">
                <div className="row">
                    {/* Left Column for Image */}
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732203242/a_uc4bwg.png"
                            className="img-fluid"
                            alt="Login"
                        />
                    </div>

                    {/* Right Column for Login Form */}
                    <div className="col-md-6">
                        <div className="card" style={{ border: 'none' }}>
                            <div className="card-header-a text-center card-header-custom">
                                <h2>Sign in</h2>
                            </div>

                            <div className="card-body">
                                {/* Social login */}
                                <div className="social-login-buttons text-center mb-5">
                                    {/* Placeholder Google login button */}
                                    <button
                                        type="button"
                                        className="btn btn-danger mb-4 w-100 py-3 mx-auto d-block rounded-button"
                                    >
                                        <i className="fab fa-google"></i> Login with Google
                                    </button>
                                </div>

                                {/* Divider with text */}
                                <div className="text-center mb-5">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000', margin: 0 }} />
                                            <span style={{ padding: '0 10px', fontSize: '14px', fontWeight: 600, color: '#555' }}>or sign in with email</span>
                                            <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000', margin: 0 }} />
                                        </div>
                                    </div>

                                {/* Login Form */}
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div className="social-login-buttons">
                                        <button
                                            type="submit"
                                            className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button"
                                            style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                            disabled={loading}
                                        >
                                            {loading ? 'Logging in...' : 'Sign In'}
                                        </button>
                                    </div>
                                </form>

                                {/* Error Message */}
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <hr />

                                {/* Links for Forgot Password and Sign Up */}
                                <p className="text-center">
                                    <a href="/auth/password/reset" className="text-dark">
                                        Forgot Password?
                                    </a>
                                </p>
                                <p className="text-center">
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-dark">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
