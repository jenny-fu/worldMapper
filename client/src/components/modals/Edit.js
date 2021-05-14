import React, { useState } 	from 'react';
import { EDIT }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Edit = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '', pemail: props.email });
	const [loading, toggleLoading] = useState(false);
	const [Edit] = useMutation(EDIT);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		console.log(updated);
		setInput(updated);
	};

	const handleEditAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to be updated');
				return;
			}
		}
		const { loading, error, data } = await Edit({ variables: { ...input  } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.edit.email === 'already exists') {
				alert('Email is already taken');
				return;
			}
			else {
				props.fetchUser();
				props.setShowEdit(false);
			}
		};
	};

	return (
		<WModal className="signup-modal" cover="true" visible={props.setShowEdit}>
			<WMHeader className="modal-header" onClose={() => props.setShowEdit(false)}>
				Update Account Information
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
										barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" 
									/>
								</WCol>
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
										barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleEditAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Update
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default Edit;
