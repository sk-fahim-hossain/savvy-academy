import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyEnrolledClasses = () => {
    const { refetch, isError, isLoading, data: allClasses = [], error } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const response = await fetch(`https://savvy-academy-server.vercel.app/${user.email}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    if ( isLoading) {
        return <p>Loading..</p>
    }
    console.log(allClasses)
    return (
        <div>
            <h2>Enrolled</h2>
            <div className="grid grid-cols-3 gap-2 mt-3">
                    {
                        allClasses.slice(0, 4).map((singleInstructor, index) => (

                            singleInstructor?.
                            paidStatus == "paid" &&
                            <div className="card card-compact  bg-base-100 shadow-xl">
                                <figure><img src={singleInstructor.selectClass?.classImage} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleInstructor?.selectClass?.className}</h2>
                                    <p>{singleInstructor?.selectClass?.className}</p>
                                    {/* <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                                    </div> */}
                                </div>
                            </div>

                        ))
                    }
                </div>
        </div>
    );
};

export default MyEnrolledClasses;