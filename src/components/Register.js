import React, { useState } from 'react';
import { register } from '../services/api';
import './Auth.css';

function Register({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await register(username, email, password);
            setSuccess(true);
            setTimeout(() => switchToLogin(), 2000);
        } catch (err) {
            setError('Użytkownik już istnieje lub błąd rejestracji');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>📝 Rejestracja</h2>
                {success ? (
                    <div className="success">Zarejestrowano! Przekierowuję do logowania...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <button type="submit">Zarejestruj się</button>
                    </form>
                )}
                <p className="switch-link">
                    Masz już konto? <span onClick={switchToLogin}>Zaloguj się</span>
                </p>
            </div>
        </div>
    );
}

export default Register;