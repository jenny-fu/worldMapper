import React from 'react';

import { WModal, WMHeader, WMMain, WButton, WMFooter } from 'wt-frontend';

const DeleteRegion = (props) => {

    const handleDelete = async () => {
        console.log(props.item)
        props.deleteItem(props.item, props.index);
        props.setShowDeleteR(false);
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowDeleteR}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteR(false)}>
                Delete List?
			</WMHeader>

            <WMMain>
                <div className="modal-info">You will be deleting this subregion and all of its subregions as well.</div>
            </WMMain>

            <WMFooter>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteR(false)} wType="texted" shape="rounded">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMFooter>

        </WModal >
    );
}

export default DeleteRegion;