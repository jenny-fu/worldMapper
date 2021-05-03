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
                		updateListField={props.updateListField}
					/>
				</WSidebar>
			</WLSide>
			<div className="mapImage"> /image of world map/ </div>
			<div className="new-map">
				<WButton onclick={props.createNewList} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Create a New Map
				</WButton>
			</div>
		</div>
	);
};

export default MapContents;