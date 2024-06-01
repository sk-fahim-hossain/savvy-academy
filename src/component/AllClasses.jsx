import React, { useContext, useEffect, useState } from 'react';
import Container from './Container';
import { useQuery } from '@tanstack/react-query';
import useUserRole from '../hooks/useUserRole';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const AllClasses = () => {
    const { user, loading: authLoading } = useContext(AuthContext)
    const { isLoading: loading, role } = useUserRole();
    const navigate = useNavigate()


    const { refetch, isError, isLoading, data: allClasses = [], error } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const response = await fetch('https://savvy-academy-server.vercel.app/classes')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })



    console.log(allClasses)

    // if (isLoading) {
    //     return <div className="grid grid-cols-3 gap-2 mt-3">
    //         {
    //             [...Array(3)].slice(0, 3).map((singleClass, index) => (
    //                 <div key={index} className="flex flex-col gap-4 w-52">
    //                     <div className="skeleton h-32 w-full"></div>
    //                     <div className="skeleton h-4 w-28"></div>
    //                     <div className="skeleton h-4 w-full"></div>
    //                     <div className="skeleton h-4 w-full"></div>
    //                 </div>
    //             ))
    //         }
    //     </div>
    // }
   

    const handleSelect = () => {
        if (!user?.email) {
            navigate('/login')
        }
    }
    return (
        <Container>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    allClasses?.map((singleClass, index) => (

                        singleClass?.status == "approved" &&
                        <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                            <figure><img src={singleClass.classImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{singleClass.className}</h2>
                                <p>{singleClass.className}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>
        </Container>
    );
};

export default AllClasses;