import React, { useContext, useState } from 'react';
import Container from '../../component/Container';
import Banner from "/images/Logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAsyncApi } from '../../hooks/useAsyncApi';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const { response,
        isLoading,
        isError,
        get,
        post, } = useAsyncApi()

    const { user, createUser, loading, updateUserProfile } = useContext(AuthContext)


    if (isLoading) {
        return <p>Loading....</p>
    }
    const handleRegister = (e) => {
        e.preventDefault()
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        // const res = axios.post('https://savvy-academy-server.vercel.app/users', {email:email, name:name, role:'user'})
                        post('https://savvy-academy-server.vercel.app/users', { email: email, name: name, role: 'user', image: photoUrl })
                            .then(res => {
                                if (res.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })



                    })
            })
            .catch(error => {
                setError(error.message)
                console.log(error)
            })
    }


    const handleGoogle = () => {
        console.log("Google click")
    }

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <Container>
                    
            <Link to="/" className="absolute border m-2 underline">Back Home</Link>
            <div className="hero min-h-screen bg-base-200 py-8 " style={{ backgroundImage: `url(${Banner})` }}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" onBlur={(e) => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" onBlur={(e) => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" onBlur={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" onBlur={(e) => setConfirmPassword(e.target.value)} placeholder="Please confirm your password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Photo URL</span>
                                </label>
                                <input type="text" onBlur={(e) => setPhotoUrl(e.target.value)} placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type='submit'>Register</button>
                            </div>
                            <p className='italic mt-2'>Already have an account. <Link to='/login' className='text-blue-700'>Login Now</Link></p>
                        </form>
                        <button onClick={handleGoogle} className='btn'>Sign With Google <FcGoogle /></button>
                    </div>
                    {
                        error && <p>{error}</p>
                    }
                </div>
            </div>
        </Container>
    );
};

export default Register;