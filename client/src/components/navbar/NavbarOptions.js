import React from 'react';
import { LOGOUT } from '../../cache/mutations';
import { useMutation, useApolloClient } from '@apollo/client';
import { WButton, WNavItem, WInput } from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
    const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset){
                props.setActiveList({});
                props.setActiveRegion('');
            }
        }
    };

    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" id="user-name" onClick={props.setShowEdit} wType="texted" hoverAnimation="text-primary">
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem>
        </>
    );  
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary">
                    Sign Up
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                    : <LoggedIn setActiveRegion={props.setActiveRegion} fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} setShowEdit={props.setShowEdit} />
            }
        </>

    );
};

export default NavbarOptions;