import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Sample credentials: username: admin, password: admin
        if (user === 'admin' && pass === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/main');
        } else {
            setError('Invalid credentials. Try username: admin and password: admin.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login to API-SETU</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
