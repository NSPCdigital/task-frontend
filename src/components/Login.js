import React, { useState } from 'react';
import { login } from '../services/api';
import './Auth.css';

function Login({ onLogin, switchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await login(username, password);
            onLogin();
        } catch (err) {
            setError('Błędny login lub hasło');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>🔐 Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Zaloguj się</button>
                </form>
                <p className="switch-link">
                    Nie masz konta? <span onClick={switchToRegister}>Zarejestruj się</span>
                </p>
            </div>
        </div>
    );
}

export default Login;