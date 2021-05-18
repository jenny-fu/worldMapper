import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {
    return (
        <WRow className="table-header">
            <WCol size="1"> </WCol>
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('name') } className='table-header-section' wType="texted" >Name</WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('capital') } className='table-header-section' wType="texted">Capital</WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('leader') } className='table-header-section' wType="texted" >Leader</WButton>
            </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" >Flag</WButton>
            </WCol>
            <WCol size="3">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('landmark') } className='table-header-section' wType="texted" >Landmarks</WButton>
            </WCol>
        </WRow>
    );
};

export default TableHeader;