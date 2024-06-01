import React from 'react';
import Container from './Container';
import { useQuery } from '@tanstack/react-query';

const AllInstructors = () => {
    const { refetch, isError, isLoading, data: allUsers = [], error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const response = await fetch('https://savvy-academy-server.vercel.app/users')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    if (isLoading) {
        return <div className="grid grid-cols-3 gap-2 mt-3">
            {
                [...Array(3)].slice(0, 3).map((singleClass, index) => (
                    <div key={index} className="flex flex-col gap-4 w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ))
            }
        </div>
    }
    return (
        <Container>
            <h2 className="text-4xl mt-[40px] mb-[30px]">Our Instructors</h2>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    allUsers.map((singleInstructor, index) => (

                        singleInstructor?.
                            role == "instructor" &&
                        <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                            <figure><img src={singleInstructor.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{singleInstructor.name}</h2>
                                <p>{singleInstructor.className}</p>
                                {/* <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                                    </div> */}
                            </div>
                        </div>

                    ))
                }
            </div>
        </Container>
    );
};

export default AllInstructors;