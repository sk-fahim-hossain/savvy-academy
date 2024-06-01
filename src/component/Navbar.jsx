import React, { useContext } from 'react';
import Logo from "/images/Logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2'
import useUserRole from '../hooks/useUserRole';


const Navbar = () => {

    const { user: authUser, logOut, loading } = useContext(AuthContext)
    const { role:userRole, isLoading} = useUserRole()
    const navigate = useNavigate()
   
    if(authUser == null){
       navigate("/login")
    }
    if(loading || isLoading){
        return <div>Loading..</div>
    }


    const hanldeLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logout successful')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log out successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error))
    }

    const user = authUser;

    const headerItem = <>
        <li><Link to="/" className='font-semibold'>Home</Link></li>
        <li><Link to="/all-classes" className='font-semibold'>All Classes</Link></li>
        <li><Link to="/all-instructors" className='font-semibold'>All Instructor</Link></li>
        {
           isLoading ? <div>Loading...</div> : <li><Link to={`/dashboard/${userRole}`} className='font-semibold'>Dashboard</Link></li>
        }
        
    </>


    return (
        <div className="navbar bg-slate-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {headerItem}
                    </ul>
                </div>
                <Link to='/'>
                    <div>
                        <img src={Logo} alt="" className='max-w-[150px]' />
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {headerItem}
                </ul>
            </div>
            {/*TODO:  right login user profile and Login or logout will be add here*/}
            <div className="navbar-end space-x-3">
                { user ?
                    user.photoURL ? <a className="btn btn-circle"><img src={user?.photoURL} title={user?.email} className='w-12 rounded-full ' /> </a> 
                    : <a className="btn btn-circle"><CgProfile className='text-xl' /></a> : ''
                }

                {
                    user ? <div className='flex items-center gap-2'> <a className='btn' onClick={hanldeLogOut}>Logout</a></div> : <Link to='/login' className="btn">Login</Link>

                }

            </div>
        </div>
    );
};

export default Navbar;