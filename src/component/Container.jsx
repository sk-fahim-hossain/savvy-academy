import React from 'react';

const Container = ({children}) => {
    return (
        <div className='mx-auto max-w-5xl'>
            {children}
        </div>
    );
};

export default Container;