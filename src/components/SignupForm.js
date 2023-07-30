import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignupForm.css';
const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://taskmanger.onrender.com/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.error);
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setMessage('');
        }
    };
    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p className="create-account-link">
                Already Registered? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignupForm;
