// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            // *** THIS IS THE KEY STEP ***
            localStorage.setItem('token', response.data.token);

            navigate('/'); // Redirect to the notes page
        } catch (error) {
            alert('Invalid credentials. Please try again.');
            console.error('Login error', error);
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
);
}

export default LoginPage;