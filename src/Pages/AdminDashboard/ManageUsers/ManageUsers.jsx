import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useAsyncApi } from '../../../hooks/useAsyncApi';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const {patch, isLoading:loading} = useAsyncApi()
    const {refetch, isError, isLoading, data: allUser = [], error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const response = await fetch('https://savvy-academy-server.vercel.app/users/')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })

    


    const handleChangeRole = (email, setectedRole) =>{
        patch('https://savvy-academy-server.vercel.app/users', {email,role:setectedRole})
                 .then(res =>{
                    if(res.modifiedCount){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User Role Updated",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        refetch()
                    }
                 })
    }
   
    return (
        <div>
            <h2 className='text-3xl uppercase'>Manage users</h2>
            <div className="divider"></div>
            <div className='m-3 shadow-sm rounded-lg bg-slate-50'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serail No.</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser.map((user, index) => (
                                    <tr key={user._id}>
                                        <th>{0+index}</th>
                                        <td>{user?.name}</td>
                                        <td><p className='font-bold'>{user.role}</p></td>
                                        {!loading ?<td className='space-x-2'>
                                            <button onClick={()=>handleChangeRole(user.email, "admin")} className='btn btn-sm bg-info'>Make Admin</button>
                                            <button onClick={()=>handleChangeRole(user.email, "instructor")} className='btn btn-sm bg-accent'>Make Instructor</button>
                                            <button onClick={()=>handleChangeRole(user.email, "user")} className='btn btn-sm bg-lime-300'>Make User</button>
                                        </td>:"Loading.."}
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

export default ManageUsers;