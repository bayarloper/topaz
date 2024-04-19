// pages/login.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from "../../../utils/auth"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Simulated login logic, replace it with your actual authentication logic
        if (username === 'admin' && password === 'password') {
            // Simulated token, replace it with the actual token received from your server
            const token = 'simulated_token';

            // Store the token in local storage
            login(token);

            // Redirect to the dashboard page upon successful login
            router.push('/dashboard');
        } else {
            // Handle invalid credentials
            console.error('Invalid credentials');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
