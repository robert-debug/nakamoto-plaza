import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { requestCoins } from '../store/coins'
import { DisplayStateContext } from '../context/Display'
import Prices from './Prices'
import Portfolio from './Portfolio'
import Home from './Home'

const MainDisplay = () =>{
    const dispatch = useDispatch()
    const { showDisplay } = useContext(DisplayStateContext) 
    useEffect(()=>{
        dispatch(requestCoins());
    }, [dispatch])
    return(
        <div className='main-display'>
            {showDisplay === 'Home' ? <Home /> : null}
            {showDisplay === 'Portfolio' ? <Portfolio /> : null}
            {showDisplay === 'Prices' ? <Prices/> : null}
            {showDisplay === 'coin' ? null : null}
        </div>
    )
}
export default MainDisplay