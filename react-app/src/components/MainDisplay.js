import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { DisplayStateContext } from '../context/Display'
import Prices from './Prices'
const MainDisplay = () =>{
    const { showDisplay } = useContext(DisplayStateContext) 
    
    return(
        <div className='main-display'>
            {showDisplay === 'Home' ? null : null}
            {showDisplay === 'Portfolio' ? null : null}
            {showDisplay === 'Prices' ? <Prices/> : null}
            {showDisplay === 'coin' ? null : null}
        </div>
    )
}
export default MainDisplay