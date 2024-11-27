import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api'; // Import the API function

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await requestPasswordReset(email);
            setMessage('Password reset email has been sent. Please check your inbox.');
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Send Reset Email</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PasswordResetRequest;
