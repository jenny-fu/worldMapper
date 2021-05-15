import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <SidebarEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={tempID++} key={entry._id+props.activeid} name={entry.name} _id={entry._id}
                        updateListField={props.updateListField} setShowDelete={props.setShowDelete}
                        activeButNot={props.activeButNot} maps={props.maps}
                    />
                ))
            }
        </>
    );
};

export default SidebarList;