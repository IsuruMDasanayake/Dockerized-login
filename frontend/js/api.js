const API_URL = 'http://localhost:8000';

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }

        const data = await response.json();
        
        // Store JWT token in localStorage
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

export async function verifyToken() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Token verification failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('access_token');
}

export function getToken() {
    return localStorage.getItem('access_token');
}
