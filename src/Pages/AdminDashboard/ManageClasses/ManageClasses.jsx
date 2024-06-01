import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useAsyncApi } from '../../../hooks/useAsyncApi';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const { patch, isLoading: loading } = useAsyncApi()
    const { refetch, isError, isLoading, data: allClasses = [], error } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const response = await fetch(`https://savvy-academy-server.vercel.app/classes`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    if (isLoading) {
        return <div>Loading...</div>
    }


    const handleChangeStatus = (id, updatedStatus) => {

        // patch('https://savvy-academy-server.vercel.app/classes', {id, updatedStatus})
        // .then(res => {
        //     console.log(res)
        //     // if (res) {
        //     //     Swal.fire({
        //     //         position: "top-end",
        //     //         icon: "success",
        //     //         title: "Class Create Successful",
        //     //         showConfirmButton: false,
        //     //         timer: 1500
        //     //     });
        //     // }
        // })

        fetch("https://savvy-academy-server.vercel.app/classes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, updatedStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status Upadated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    return (
        <div>
            <h2 className='text-3xl uppercase'>Manage Classes</h2>
            <div className="divider"></div>
            <div className='m-3 shadow-sm rounded-lg bg-slate-50'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serail No.</th>
                                <th>Class Name</th>
                                <th>Image</th>
                                <th>Instructor Name</th>
                                <th>Instructor Email</th>
                                <th>Avalable Seats</th>
                                <th>Price</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                allClasses.map((skill, index) => (
                                    <tr key={skill._id}>
                                        <th>{1 + index}</th>
                                        <td>{skill?.className}</td>
                                        <td><img src={skill?.classImage} className='max-w-[100px] max-h-[100px]' alt="" srcset="" /></td>
                                        <td>{skill?.instructorName}</td>
                                        <td>{skill?.instructorEmail}</td>
                                        <td>{skill?.availableSeats}</td>
                                        <td>{skill?.price}</td>
                                        <td>
                                            <div>
                                                <p className='font-semibold uppercase'>{skill?.status}</p>
                                            </div>
                                            <div className='flex'>
                                                <button onClick={() => handleChangeStatus(skill._id, "approved")} className='btn btn-sm bg-info'>Approved</button>
                                                <button onClick={() => handleChangeStatus(skill._id, "pending")} className='btn btn-sm bg-orange-400'>Pending</button>
                                                <button onClick={() => handleChangeStatus(skill._id, "denied")} className='btn btn-sm bg-warning'>Denied</button>
                                            </div>
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

export default ManageClasses;