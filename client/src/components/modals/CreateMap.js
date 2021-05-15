import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const CreateMap = (props) => {
	const [input, setInput] = useState({ name: ''});

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}
	const createNewList = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
        props.createNewList(input.name);
        props.setShowMap(false);
	};

	return (
		<WModal className="map-modal" cover="true" visible={props.setShowMap}>
			<WMHeader  className="modal-header" onClose={() => props.setShowMap(false)}>
				Create a New Map
			</WMHeader>
			{
				// loading ? <div />
					// : 
                    <WMMain className="main-login-modal">
						<WInput className="modal-input" onBlur={updateInput} name='name' labelAnimation="up" barAnimation="solid" labelText="Map Name" wType="outlined" inputType='text' />
						<div className="modal-spacer">&nbsp;</div>
					</WMMain >
			}
			<WMFooter>
				<WButton className="modal-button" onClick={createNewList} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Create
				</WButton>
			</WMFooter>
		</WModal>
	);
}

export default CreateMap;