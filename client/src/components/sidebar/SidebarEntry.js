import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const SidebarEntry = (props) => {
    const activeButNot = (_id) => {
        const maps = props.maps;
        const selectedList = maps.find(todo => todo._id === _id);
        props.activeButNot(selectedList);
    };

    return (
        <WNavItem className="list-item" onClick={() => { activeButNot(props._id) }}>
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