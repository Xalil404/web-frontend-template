import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordResetConfirm = () => {
    const { uid, token } = useParams(); // Extract uid and token from the URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/auth/password/reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid,
                    token,
                    new_password1: newPassword,
                    new_password2: confirmPassword,
                }),
            });

            if (response.ok) {
                setMessage('Password has been reset successfully. Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
            } else {
                const data = await response.json();
                setError(data?.detail || 'An error occurred. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PasswordResetConfirm;
