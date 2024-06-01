import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../../Providers/AuthProvider';
import { useAsyncApi } from '../../../hooks/useAsyncApi';
import Swal from 'sweetalert2';

const AddClasses = () => {
    const { post } = useAsyncApi()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = (data) => {
        data.status = "pending";
        data.enrolled = 0;
        post('https://savvy-academy-server.vercel.app/classes', data)
            .then(res => {
                if (res.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Create Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                   reset()
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl'>Add Class</h2>
            <div className="divider"></div>
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 p-3">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text" {...register("className")} placeholder="Class Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Image Url</span>
                        </label>
                        <input type="text" {...register("classImage")} placeholder="Image Url" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} {...register("instructorName")} readOnly placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} {...register("instructorEmail")} readOnly placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available Seats</span>
                        </label>
                        <input type="number" {...register("availableSeats")} placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" {...register("price")} placeholder="Class Price" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary" type='submit'>Add</button>
                    </div>

                </form>
                {/* <button onClick={handleGoogle} className='btn'>Sign With Google <FcGoogle /></button> */}
            </div>
        </div>
    );
};

export default AddClasses;