import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { getToken } from './services/api';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return <Dashboard onLogout={handleLogout} />;
    }

    if (showRegister) {
        return <Register switchToLogin={() => setShowRegister(false)} />;
    }

    return <Login onLogin={handleLogin} switchToRegister={() => setShowRegister(true)} />;
}

export default App;