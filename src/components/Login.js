import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Adding useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', email);
                console.log('User email stored:', email);
                setMessage('Login successful!');
                onLogin(email); // Notify parent component about successful login
                navigate('/'); // Redirecting to start game page
            } else {
                console.error('Login failed:', data.message);
                setMessage(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Failed to login');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
};

export default Login;
