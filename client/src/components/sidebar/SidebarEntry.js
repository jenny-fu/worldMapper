import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const SidebarEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);

    const activeButNot = (_id) => {
        const maps = props.maps;
        const selectedList = maps.find(todo => todo._id === _id);
        props.activeButNot(selectedList);
    };

    const handleEditing = (e) => {
        activeButNot(props._id);
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };

    return (
        props.regionViewer ?
            <div className='landmark-line'>
                <WButton className='landmark-del ' wType="texted" clickAnimation={"ripple-light"} hoverAnimation='darken' color='danger'>
                    <i className="material-icons">close</i>
                </WButton>
                <div className='landmark-text'>{props.landmark}</div>
            </div>
        :
            <WNavItem className="list-item" onClick={handleEditing}>{
                editing ? <WInput className="list-edit" inputClass="list-input"
                    onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                    name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                    />
                :
                <div className='list-text' onClick={() => { props.handleSetActive(props._id) }} >
                    {props.name}
                </div>
            }
                <WButton onClick={props.setShowDelete} wType="texted" className="delete-map" clickAnimation={"ripple-light"}>
                    <i className="material-icons">delete_outline</i>
                </WButton>
            </WNavItem>
    );
};

export default SidebarEntry;