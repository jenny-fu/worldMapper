import React                            from 'react';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WMMain, WLSide } from 'wt-frontend';
import SidebarList 					from '../sidebar/SidebarList';

const MapContents = (props) => {
    return (
        <div className='table ' >
            <div className="mapHeader">Your Maps</div>
            <WLSide side="left">
				<WSidebar>
					{
						<SidebarList

						/>
					}
				</WSidebar>
			</WLSide>
        </div>
    );
};

export default MapContents;