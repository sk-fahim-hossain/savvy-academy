import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import AllClasses from '../../component/AllClasses';
import AllInstructors from '../../component/AllInstructors';
import Testimonials from '../../component/Testimonials';

const Home = () => {
    

    
    const handleSelect = (person) => {
        // if (!person?.email) {
        //     navigate('/login')
        // }
    }

    
    return (
        <div>
            {/* <Header></Header> */}
            <div className='my-14'>
                <h2 className='text-3xl my-5'>Popular Classes</h2>
               
                <AllClasses></AllClasses>
            </div>
            <div className='my-10'>
                <AllInstructors></AllInstructors>
            </div>
            <div className='my-10'>
                <h2 className='text-3xl my-5 text-center'>What People are Say</h2>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;