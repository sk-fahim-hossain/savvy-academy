import React from 'react';
import Container from './Container';
import person1 from '../../public/images/person1.jpg'

const Testimonials = () => {
    return (
        <Container>
             <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    [...Array(3)].map((_,index) => (
                        <div key={index} className="card card-compact  bg-base-100 ">
                            <figure><img src={person1} alt="Shoes" className='rounded-full'/></figure>
                            <div className="card-body text-center">
                                <h2 className="text-xl text-center">Mical</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default Testimonials;