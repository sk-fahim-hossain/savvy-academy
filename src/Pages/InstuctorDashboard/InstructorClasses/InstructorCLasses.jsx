import React, { useContext, useEffect } from 'react';
import { useAsyncApi } from '../../../hooks/useAsyncApi';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProvider';

const InstructorCLasses = () => {
    const {user} = useContext(AuthContext)

    const { refetch, isError, isLoading, data: allClasses = [], error } = useQuery({
        queryKey: ['allClasses', user],
        queryFn: async () => {
            const response = await fetch(`https://savvy-academy-server.vercel.app/classes/${user.email}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2 className='text-3xl'>My Classes</h2>
            <div className="divider"></div>
            <div className='ml-3'>All Class: {allClasses.length}</div>

            <div className='m-3 shadow-sm rounded-lg bg-slate-50'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serail No.</th>
                                <th>Class Name</th>
                                <th>Status</th>
                                <th>Enrolled</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allClasses.map((skill, index) => (
                                    <tr key={skill._id}>
                                        <th>{1 + index}</th>
                                        <td>{skill?.className}</td>
                                        <td>{skill?.status}</td>
                                        <td>{skill?.enrolled}</td>
                                        <td>
                                            <button onClick={()=>console.log('onlcick')} className='btn btn-sm bg-info'>Update</button>
                                        </td>

                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstructorCLasses;