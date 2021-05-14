import React from 'react';
import { WNavbar, WSidebar, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WMMain, WLSide } from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import SidebarList from '../sidebar/SidebarList';

const MapContents = (props) => {
	return (
		<div className='map-table'>
			<div className="mapHeader">Your Maps</div>
			<WLSide side="left">
				<WSidebar className="sidebar-list">
					<SidebarList
						activeid={props.activeid} handleSetActive={props.handleSetActive}
                		listIDs={props.listIDs} createNewList={props.createNewList}
                		updateListField={props.updateListField} setShowDelete={props.setShowDelete}
					/>
				</WSidebar>
			</WLSide>
			<img src="https://data.whicdn.com/images/349168681/original.jpg" className="mapImage"></img>
			<div className="new-map">
				<WButton onClick={props.createNewList} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Create a New Map
				</WButton>
			</div>
		</div>
	);
};

export default MapContents;