import React, { useContext, useState } from 'react';
import Container from '../../component/Container';
import Banner from "/images/Logo.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const [password, setPassword, setLoading] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const { signIn, loading } = useContext(AuthContext)
    const navigate = useNavigate()



    const handleLogin = (e) => {
        e.preventDefault()
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                if (result.user?.email) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                    setLoading(false)
                }
            })
            .catch(error =>{setError(error.message); console.log(error)})
    }


    const handleGoogle = () => {
        console.log('google click')
    }


    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <Container>
            <p>{error}</p>
            <div className="hero min-h-screen bg-base-200 " style={{ backgroundImage: `url(${Banner})` }}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3">
                        <form onSubmit={handleLogin} className="card-body">
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
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type='submit'>Login</button>
                            </div>
                            <p className='italic mt-2'>New on Savvy Academy? <Link to='/register' className='text-blue-700'>Register Now</Link></p>
                        </form>
                        <button onClick={handleGoogle} className='btn'>Login With Google <FcGoogle /></button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;


