import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import { Navigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const {role, isLoading} = useUserRole()
    if (isLoading) return <div>Loading...</div>

   
    
    return (
        <div>
          <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;