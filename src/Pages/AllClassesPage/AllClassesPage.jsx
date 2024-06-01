
import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserRole from '../../hooks/useUserRole';
import { AuthContext } from '../../Providers/AuthProvider';
import Container from '../../component/Container';


const AllClassesPage = () => {
    const { user, loading: authLoading } = useContext(AuthContext)
    const { isLoading: loading, role } = useUserRole();
    const navigate = useNavigate()

    const { allInstructor, setAllInstructor } = useState([])
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


   


    


    const handleSelect = (selectClass) => {

        // if (!user?.email) {
        //     navigate('/login')
        // }
        fetch("https://savvy-academy-server.vercel.app/selected-classes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, selectClass })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Seleted",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }
    console.log(allClasses)
    return (
        <Container>
            <h2 className="text-4xl mt-[40px] mb-[30px]">All Classes</h2>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    allClasses.map((singleClass, index) => (

                        singleClass?.status == "approved" &&
                        <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                            <figure><img src={singleClass.classImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{singleClass.className}</h2>
                                <p>{singleClass.className}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => handleSelect(singleClass)}>Select</button>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>

        </Container>
    );
};

export default AllClassesPage;