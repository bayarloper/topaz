// pages/dashboard.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../utils/auth';

const DashboardPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            // Redirect to login page if not authenticated
            router.push('/admin/login');
        }
    }, []);

    // Render your dashboard content here
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            {/* Your dashboard content */}
        </div>
    );
};

export default DashboardPage;
