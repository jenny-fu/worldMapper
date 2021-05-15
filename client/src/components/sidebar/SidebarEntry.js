import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const SidebarEntry = (props) => {
    return (
        <WNavItem className="list-item" >
            <div className='list-text' onClick={() => { props.handleSetActive(props._id) }} >
                {props.name}
            </div>
            <WButton onClick={props.setShowDelete} wType="texted" className="delete-map" clickAnimation={"ripple-light"}>
                <i className="material-icons">delete_outline</i>
            </WButton>
        </WNavItem>
    );
};

export default SidebarEntry;