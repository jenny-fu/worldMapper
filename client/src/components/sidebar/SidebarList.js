import React, { useState } from 'react';
import { WSidebar, WButton, WInput } from 'wt-frontend';
import SidebarEntry from './SidebarEntry';
import { useMutation, useQuery } from '@apollo/client';
import * as mutations from '../../cache/mutations';

const SidebarList = (props) => {
    let tempID = 0;
    const regionID = props.activeRegionID;
    const mapList = props.maps;
    const [AddLandmark] = useMutation(mutations.ADD_LANDMARK);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value };
        setInput(updated);
    };

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
    const [input, setInput] = useState({ name: ''});
    const addLandmark = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('Please enter a landmark name');
				return;
			}
		}
		const { loading, error, data } = await AddLandmark({ variables: { ...input, region: region } });
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
            props.setActiveRegion(data.addLandmark);
		};
    };

    const getLandmarks = (items) => { //array of strings
        if (items) {
            let out = []
            if (items.landmarks) {
                out = items.landmarks.slice();
                for (var i = 0; i < items.region.length; i++) {
                    console.log("checking..", items[i]);
                    if (items[i]) out = out.concat(getLandmarks(items[i].region));
                }
            }
            return out;
        }
    }

    let landmarkList = [];
    if(region) landmarkList = getLandmarks(region);
    console.log("list of landmarks: ", landmarkList);

    return (
        props.regionViewer ?
            <div className='region-right'>
                <div className="region-landmarks">Region Landmarks:</div>
                <WSidebar className='landmark-table'>
                    { (landmarkList.length > 0) ?
                        landmarkList.map(landmark => (
                            <SidebarEntry regionViewer={props.regionViewer} landmark={landmark} />
                        )) : <h2 className="nothing-msg"> No current landmarks! </h2>
                    }
                </WSidebar>
                <div className='landmark-container'>
                    <div className='landmark-add'>
                        <WButton className='landmark-plus' wType="texted" clickAnimation={"ripple-light"}
                         onClick={addLandmark}
                        >
                            <i className="material-icons">add</i>
                        </WButton>
                        <WInput
                            className="landmark-input" onBlur={updateInput} name="name" inputType="text"
                            // onKeyDown={(e) => {if(e.keyCode === 13) addLandmark(e)}}
                        />
                    </div>
                </div>
            </div>
            :
            (props.maps.length > 0) ?
                <>
                    {
                        props.listIDs &&
                        props.listIDs.map(entry => (
                            <SidebarEntry
                                handleSetActive={props.handleSetActive} activeid={props.activeid}
                                id={tempID++} key={entry._id + props.activeid} name={entry.name} _id={entry._id}
                                updateListField={props.updateListField} setShowDelete={props.setShowDelete}
                                activeButNot={props.activeButNot} maps={props.maps}
                            />
                        ))
                    }
                </>
                : <h2 className="nothing-msg"> No maps added! </h2>
    );
};

export default SidebarList;