import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/LoginForm.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await fetch('https://taskmanger.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, store the token and redirect to task list
                localStorage.setItem('token', data.token);
                navigate('/tasklist');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <p className="create-account-link">
                Not yet Registered? <Link to="/signup">Create account</Link>
            </p>
        </div>
    );
};

export default Login;
