// pages/dashboard.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../../utils/auth';

const DashboardPage = () => {
    // Render your dashboard content here
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <button onClick={(logout)}>Click Me</button>
        </div>
    );
};

export default DashboardPage;
