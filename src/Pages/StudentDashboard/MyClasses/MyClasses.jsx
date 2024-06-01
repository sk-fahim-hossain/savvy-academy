import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const { user, loading } = useContext(AuthContext)

    const { refetch, isError, isLoading, data: allClasses = [], error } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const response = await fetch(`https://savvy-academy-server.vercel.app/selected-classes/${user.email}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    if (loading || isLoading) {
        return <p>Loading..</p>
    }
    console.log(allClasses)

    const handleDelete = (pd) => {

        fetch(`https://savvy-academy-server.vercel.app/selected-classes/${pd._id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }
    const handlePay = (pd) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://savvy-academy-server.vercel.app/selected-classes/${pd._id}`, {
                    method: "PATCH",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Paid",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }

                    })

            }
        });



    }
    return (
        <div>
            <h1 className='text-3xl'>My clasess</h1>
            <div className="divider"></div>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    allClasses.map((singleClass, index) => (
                        !singleClass.paidStatus &&
                        <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                            <figure><img src={singleClass.selectClass?.classImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{singleClass.selectClass?.className}</h2>
                                <p>{singleClass?.selectClass?.className}</p>
                                <div className="card-actions justify-between">
                                    <button className="btn btn-primary" onClick={() => handleDelete(singleClass)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => handlePay(singleClass)}>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyClasses;