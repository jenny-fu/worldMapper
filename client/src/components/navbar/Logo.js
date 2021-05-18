import React from 'react';
import Level from './Level';

const Logo = (props) => {
    return (
        props.active ?
            <div className="secondary-container">
                <div className='logo-active logo' onClick={props.reset}>
                    The World Data Mapper
                </div>
            </div>
            :
            <div className='logo'>
                The World Data Mapper
            </div>
    );
};

export default Logo;