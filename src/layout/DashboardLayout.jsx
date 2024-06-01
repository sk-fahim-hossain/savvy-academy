import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { Link, Navigate, Outlet, redirect, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { useAsyncApi } from '../hooks/useAsyncApi';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);
    const [userRole, setUserRole] = useState('user')
    const {isLoading, role} = useUserRole();

   

    if (loading || isLoading) {
        return <div>Loading...</div>
    }
    
    console.log(role)
  
    
    return (
        <>
            <Navbar />
            <div className='flex'>
                <div className='w-[20%] bg-gray-200 min-h-screen'>
                    <div className=" p-1">
                    {role == 'user' &&
                        <div className="flex flex-col space-y-2 m-2">
                            <Link to="user/my-classes" className='btn mt-2'>My Classes</Link>
                            <Link to="user/my-enrolled" className='btn'>My Enrolled</Link>
                            <Link to="user/payment-history" className='btn'>Payment History</Link>
                        </div>
                    }
                    {role == 'instructor' &&
                        <div className="flex flex-col space-y-2 m-2">
                            <Link to="instructor/add-class" className='btn mt-2'>Add Class</Link>
                            <Link to="instructor/my-classes" className='btn'>My Classes</Link>
                        </div>
                    }
                    {role == 'admin' &&
                        <div className="flex flex-col space-y-2 m-2">
                            <Link to="admin/manage-user" className='btn'>Manage User</Link>
                            <Link to="admin/manage-classes" className='btn mt-2'>Manage Classes</Link>
                        </div>
                    }
                    </div>
                </div>
                <div className='w-[80%] bg-slate-200 p-4'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;