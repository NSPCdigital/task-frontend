import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Zapisz token w localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Pobierz token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Usuń token (wylogowanie)
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Rejestracja
export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password
    });
    return response.data;
};

// Logowanie
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });
    if (response.data.access_token) {
        setToken(response.data.access_token);
    }
    return response.data;
};

// Pobierz zadania
export const getTasks = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// Dodaj zadanie
export const addTask = async (title) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/tasks`, 
        { title },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
};

// Usuń zadanie
export const deleteTask = async (taskId) => {
    const token = getToken();
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};