import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const SidebarRegion = (props) => {
    const clickDisabled = () => { };
    const regionID = props.activeRegionID;
    const mapList = props.maps;
    
    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' region-buttons-disabled ' : 'region-buttons ',
        onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' region-buttons-disabled ' : 'region-buttons ',
        onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    const findRegion = (items, id) => {
        if (items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id === id) {
                    return items[i];
                }
                var found = findRegion(items[i].region, id);
                if (found) return found;
            }
        }
    }

    const region = findRegion(mapList, regionID);
    const buttonStyle = (props.parent.region.length > 0) ? '' : 'disabled';

    return (
        <>{
        region ?
        <div className="region-left">
            <div className="region-buttons">
                <WButton {...undoOptions}>
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton  {...redoOptions}>
                    <i className="material-icons">redo</i>
                </WButton>
            </div>
            <div className='region-flag'>/region flag/</div>
            <div className='region-info'>
                <div className='region-text'>Region Name: {region.name} </div>
                <div className='region-parent'>
                    <div className='region-text-parent'>Parent Region:</div>
                    <div className='region-text-blue'> {props.activeList.name} </div>
                </div>
                <div className='region-text'>Region Capital: {region.capital} </div>
                <div className='region-text'>Region Leader: {region.leader} </div>
                <div className='region-text'># of Subregions: {region.region.length} </div>
            </div>
            <div className='sibling-buttons'>
                <WButton className={`${buttonStyle} next-sib`} wType="texted">
                    <i className="material-icons">arrow_back</i>
                </WButton>
                <WButton className={`${buttonStyle} next-sib`} wType="texted">
                    <i className="material-icons">arrow_forward</i>
                </WButton>
            </div>
        </div> : <></> 
    }</>
    );
};

export default SidebarRegion;