import React from 'react';

const Logo = (props) => {
    return (
        props.active ?
            <div>
                <div className='logo-active logo' onClick={props.reset}>
                    The World Data Mapper
                </div>
                <div className="levels">

                </div>
            </div>
        :
            <div className='logo'>
                The World Data Mapper
            </div>
    );
};

export default Logo;