import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;
    const name = data.name; //descr
    const capital = data.capital; ///dd
    const leader = data.leader //comp
    const index = props.index;
    const itemData = props.data;
    let landmarks = 'No Current Landmarks';
    if(data.landmarks && data.landmarks.length > 0) landmarks = data.landmarks[0] + ", ..."; //assign

    const canMoveUp = props.index > 0 ? true : false;
    const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    const [editingDate, toggleDateEdit] = useState(false);
    const [editingDescr, toggleDescrEdit] = useState(false);
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [editingAssigned, toggleAssignEdit] = useState(false);

    const handleDateEdit = (e) => { //capital
        toggleDateEdit(false);
        const newDate = e.target.value ? e.target.value : 'Subregion Capital';
        const prevDate = capital;
        if(newDate !== prevDate) {
            props.editItem(data._id, 'capital', newDate, prevDate);
        }

    };

    const handleDescrEdit = (e) => { //name
        toggleDescrEdit(false);
        const newDescr = e.target.value ? e.target.value : 'Subregion Name';
        const prevDescr = name;
        if(newDescr !== prevDescr) {
            props.editItem(data._id, 'name', newDescr, prevDescr);
        }
    };

    const handleStatusEdit = (e) => { //leader
        toggleStatusEdit(false);
        const newStatus = e.target.value ? e.target.value : 'Subregion Leader';
        const prevStatus = leader;
        if(newStatus !== prevStatus) {
            props.editItem(data._id, 'leader', newStatus, prevStatus);
        }
    };

    // const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Subregion Landmarks';
    //     const prevAssigned = landmarks;
    //     if(newAssigned !== prevAssigned) {
    //         props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    // }

    return (
        <WRow className='table-entry'
        // onClick={props.activeEntry(itemData, index)}
        >
            <WCol size="1">
                <div className="del-item">
                    <WButton className="table-entry-buttons" wType="texted"
                    // onClick={props.setShowDeleteR}
                    onClick={() => props.deleteItem(data, props.index)}
                    >
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

            <WCol size="2">
                {
                    editingDescr || name === '' //name
                        ? <WInput
                            className='table-input' onBlur={handleDescrEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleDescrEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text" onClick={() => toggleDescrEdit(!editingDescr)}>
                            <div className="darken-text" onClick={() => props.setActiveList(data)}>{name}</div>
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingDate || capital === '' 
                    ? <WInput //cap
                        className='table-input' onBlur={handleDateEdit}
                        onKeyDown={(e) => {if(e.keyCode === 13) handleDateEdit(e)}}
                        autoFocus={true} defaultValue={capital} type='text'
                        inputClass="table-input-class"
                    />
                        : <div className="table-text" onClick={() => toggleDateEdit(!editingDate)}>
                            {capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus || leader === ''
                    ? <WInput //leader
                        className='table-input' onBlur={handleStatusEdit}
                        onKeyDown={(e) => {if(e.keyCode === 13) handleStatusEdit(e)}}
                        autoFocus={true} defaultValue={leader} type='text'
                        inputClass="table-input-class"
                    />
                        : <div onClick={() => toggleStatusEdit(!editingStatus)} className='table-text'>
                            {leader}
                        </div>
                }
            </WCol>

            <WCol size="2">
                <div className="table-text"> /flag/ </div>
            </WCol>

            <WCol size="3">
                {
                    // editingAssigned || landmarks === '' //landmark
                    //     ? <WInput
                    //         className='table-input' onBlur={handleAssignEdit}
                    //         onKeyDown={(e) => {if(e.keyCode === 13) handleAssignEdit(e)}}
                    //         autoFocus={true} defaultValue={landmarks} type='text'
                    //         inputClass="table-input-class"
                    //     />
                    //     :
                        <div className='table-text'
                            onClick={() => props.setActiveRegion(data._id)}
                            // onClick={() => toggleAssignEdit(!editingAssigned)}
                        >{landmarks}
                        </div>
                }
            </WCol>
        </WRow>
    );
};

export default TableEntry;