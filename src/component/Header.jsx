import React from 'react';
import banner1 from '/images/header-1.png'
import banner2 from '/images/header-2.png'
import banner3 from '/images/header-3.png'

const Header = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full relative">
                    <div className="absolute top-24 left-4">
                        <h1 className='text-5xl font-bold'>Welcome to <br /> Shavvy Academy</h1>
                        <p className='text-2xl font-semibold mt-3'>We Teach how to be a master in Fashion Design.</p>
                    </div>
                    <img src={banner1} className="w-full" />
                </div>
                <div id="item2" className="carousel-item w-full relative">
                    <div className="absolute top-24 left-4 text-white">
                        <h1 className='text-5xl font-bold'>What make <br /> Shavvy Academy Greate?</h1>
                        <p className='text-2xl font-semibold mt-3'>Our best team support for you 24 hours.</p>
                    </div>
                    <img src={banner2} className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full relative">
                <div className="absolute top-24 left-4 text-white ">
                        <h1 className='text-5xl font-bold'>How you can <br /> make your dream profession?</h1>
                        <p className='text-2xl font-semibold mt-3'>Experiance mentors with many years of industrial <br/> works makes easy the run.</p>
                    </div>
                    <img src={banner3} className="w-full" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>
    );
};

export default Header;