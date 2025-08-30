// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { username, password });
            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (error) {
            alert('Error signing up. Username might already be taken.');
            console.error('Signup error', error);
        }
    };

    return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create an Account
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
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login
                </Link>
            </p>
        </div>
    </div>
    );
}

export default SignupPage;