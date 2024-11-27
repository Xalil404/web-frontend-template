import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // Google OAuth
import { registerUser } from '../../services/api'; // API function to register user

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showEmailFields, setShowEmailFields] = useState(false);

    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate password match
        if (password1 !== password2) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // API call to register the user
            const data = await registerUser(username, email, password1, password2);
            console.log('Registration successful:', data);

            // Redirect to dashboard upon success
            navigate('/dashboard');
            
            // Clear form after successful registration
            setUsername('');
            setEmail('');
            setPassword1('');
            setPassword2('');
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const responseGoogle = (response) => {
        console.log('Google login response:', response);
        // Handle Google login success here (e.g., call API to authenticate user)
    };

    return (
        <GoogleOAuthProvider clientId="17966200055-rc9cu06jutt8mo0cqob43vhnejvbltd4.apps.googleusercontent.com">
            <div className="container mt-5">
                <div className="row">
                    {/* Left Column for Image */}
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732203242/a_uc4bwg.png"
                            className="img-fluid"
                            alt="Sign Up"
                        />
                    </div>

                    {/* Right Column for Form */}
                    <div className="col-md-6">
                        <div className="card" style={{ border: 'none' }}>
                            <div className="card-header-1 text-center card-header-custom">
                                <h2>Sign Up</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Google Login Button */}
                                    <div className="social-login-buttons text-center mb-5">
                                        <GoogleLogin
                                            onSuccess={responseGoogle}
                                            onError={() => console.error('Login Failed')}
                                            ux_mode="popup"
                                            cookiePolicy="single_host_origin"
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-danger mb-4 w-100 py-3 mx-auto d-block rounded-button"
                                            >
                                                <i className="fab fa-google"></i> Login with Google
                                            </button>
                                        </GoogleLogin>
                                    </div>

                                    
                                    {/* Divider */}
                                    <div className="text-center mb-5">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000', margin: 0 }} />
                                            <span style={{ padding: '0 10px', fontSize: '14px', fontWeight: 600, color: '#555' }}>or sign in with email</span>
                                            <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000', margin: 0 }} />
                                        </div>
                                    </div>


                                    {/* Button to show email registration fields */}
                                    <div className="social-login-buttons text-center mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button"
                                            id="email-button"
                                            style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                            onClick={() => setShowEmailFields(true)}
                                        >
                                            Continue with Email
                                        </button>
                                    </div>

                                    {/* Email Registration Fields (initially hidden) */}
                                    {showEmailFields && (
                                        <div id="email-fields">
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
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
                                                value={password1}
                                                onChange={(e) => setPassword1(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                className="form-control mb-3"
                                                placeholder="Confirm Password"
                                                value={password2}
                                                onChange={(e) => setPassword2(e.target.value)}
                                                required
                                            />
                                            <div className="social-login-buttons">
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button"
                                                    id="signup-button"
                                                    style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </form>
                                <hr />
                                <p className="text-center">
                                    Already have an account? <a href="/login" className="text-dark">Sign in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Register;
