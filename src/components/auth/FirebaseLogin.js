import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/firebase'; // Adjust the path to your firebase.js file

import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const FirebaseLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle between login and forgot password

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login (e.g., redirect or update state)
      navigate('/dashboard'); // Redirect to home (adjust the path if needed)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
      setIsForgotPassword(false); // After sending the email, go back to login screen
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to home (adjust the path if needed)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">{isForgotPassword ? "Reset Password" : "Login"}</h2>
        {error && <p className="text-danger">{error}</p>}

        {/* Sign In Form */}
        {!isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // Forgot Password Form
          <div>
            <p>Enter your email to receive a password reset link.</p>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={handleForgotPassword} className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        )}

        <button onClick={() => setIsForgotPassword(!isForgotPassword)} className="btn btn-link w-100 mt-3">
          {isForgotPassword ? "Back to Login" : "Forgot Password?"}
        </button>

        <hr />
        <button onClick={handleGoogleSignIn} className="btn btn-outline-primary w-100">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default FirebaseLogin;
