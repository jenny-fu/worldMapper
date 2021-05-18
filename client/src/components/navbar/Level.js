import React, { useState } from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const Level = (props) => {
    return (
        <>
            <div className='level-text clickable'>{props.name}</div>
            <div className='level-text'>&gt;</div>
        </>
    );
};

export default Level;