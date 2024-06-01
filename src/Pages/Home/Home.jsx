import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import AllClasses from '../../component/AllClasses';
import AllInstructors from '../../component/AllInstructors';
import Testimonials from '../../component/Testimonials';

const Home = () => {
    const [classes, setClasses] = useState([])
    const [instructor, setInstructor] = useState([])
    useEffect(() => {
        fetch('https://savvy-academy-server.vercel.app/classes')
            .then(response => response.json())
            .then(data => setClasses(data))


    }, [])
    useEffect(() => {
        fetch('https://savvy-academy-server.vercel.app/users')
            .then(response => response.json())
            .then(data => setInstructor(data))
    }, [])

    const handleSelect = () => {
        if (!user?.email) {
            navigate('/login')
        }
    }

    console.log(classes)
    return (
        <div>
            <Header></Header>
            <div className='my-14'>
                <h2 className='text-3xl my-5'>Popular Classes</h2>
                <div className="grid grid-cols-3 gap-2 mt-3">
                    {
                        classes.slice().map((singleInstructor, index) => (

                            singleInstructor?.status === "approved" &&
                            <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                                <figure><img src={singleInstructor.classImage} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleInstructor.className}</h2>
                                    <p>{singleInstructor.className}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
            <div className='my-10'>
                <h2 className='text-3xl my-5'>Popular Instructors</h2>
                <div className="grid grid-cols-3 gap-2 mt-3">
                    {
                        instructor.slice(0, 4).map((singleInstructor, index) => (

                            singleInstructor?.
                            role == "instructor" &&
                            <div className="card card-compact  bg-base-100 shadow-xl">
                                <figure><img src={singleInstructor.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleInstructor.name}</h2>
                                    <p>{singleInstructor.className}</p>
                                    {/* <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                                    </div> */}
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
            <div className='my-10'>
                <h2 className='text-3xl my-5 text-center'>What People are Say</h2>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;