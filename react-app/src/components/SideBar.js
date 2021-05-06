import React, {useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import portfolio from '../image-assets/suitcase-icon.svg'
import prices from '../image-assets/price-list.svg'

const SideBar = () => {

    return (
        <>
            <img className='portfolio-img' src={portfolio}/>
            <img className='price-list-button' src={prices}/>
        </>
        
    )
}

export default SideBar;