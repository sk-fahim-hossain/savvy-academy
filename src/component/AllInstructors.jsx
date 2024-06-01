import React from 'react';
import Container from './Container';

const AllInstructors = () => {
    return (
        <Container>
            <div className="grid grid-cols-3 gap-2 mt-3">
                {
                    [...Array(6)].map((index) => (
                        <div key={index} className="card card-compact  bg-base-100 shadow-xl">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default AllInstructors;