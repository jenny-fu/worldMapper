import React from 'react';
import TableHeader   from './TableHeader';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionHeader = (props) => {
    const clickDisabled = () => { };
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <WRow className="region-header">
                <WCol className="table-header-buttons" size="3">
                    <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">add</i>
                    </WButton>
                    <WButton {...undoOptions}>
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton  {...redoOptions}>
                            <i className="material-icons">redo</i>
                    </WButton>
                </WCol>
                <WCol size="2">
                    <div className="region-name title-name">Region Name:</div>
                </WCol>
                <WCol size="1"></WCol>
                <WCol size="3">
                    <div className="region-name actual-name">{props.activeList.name} </div>
                </WCol>
        </WRow>
    );
};

export default RegionHeader;