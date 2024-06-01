import React, { useContext, useEffect, useState } from 'react';
import Container from './Container';
import { useQuery } from '@tanstack/react-query';
import useUserRole from '../hooks/useUserRole';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const AllClasses = () => {
    const {user,loading:authLoading } = useContext(AuthContext)
    const {isLoading:loading, role} = useUserRole();
    const navigate = useNavigate()
    const {allInstructor, setAllInstructor} = useState([])
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
   
 


    // if(user?.email){
    //     return(
    //         Navigate('/login')
    //     )
    // }
    if(isLoading || authLoading){
        return <p>Loading..</p>
    }
    console.log(allInstructor)

    const handleSelect =() =>{
        if(!user?.email){
                navigate('/login')
            }
    }
    return (
        <Container>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    allClasses.slice(0,3).map((singleClass, index) => (

                        singleClass?.status == "approved" &&
                        <div className="card card-compact  bg-base-100 shadow-xl">
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