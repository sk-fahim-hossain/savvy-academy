import React, { useContext } from 'react';
import { useAsyncApi } from '../../hooks/useAsyncApi';
import useUserRole from '../../hooks/useUserRole';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';


const Secret = () => {

const {role}  = useUserRole()

    const handleBtn =async()=>{
        
       console.log(role)
    }
   
  
    return (
        <div>
            <h1>Secret Page</h1>
            <button onClick={handleBtn}  className='btn'>Get Secret</button>
            <button  className='btn'>Get </button>
        </div>
    );
};

export default Secret;