import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import portfolio from '../image-assets/suitcase-icon.svg'
import prices from '../image-assets/price-list.svg'
import home from '../image-assets/home-button.svg'
import { DisplayStateContext } from '../context/Display'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { showDisplay, setShowDisplay } = useContext(DisplayStateContext);
    const onHome = (e)=> {
        setShowDisplay('Home');
        history.push('/');
    }
    const onPortfolio = (e)=> setShowDisplay('Portfolio')
    const onPrices = (e)=> setShowDisplay('Prices')
    return (
        <div className='sidebar'>
            <img className='home-img' src={home} onClick={onHome}/>
            <img className='portfolio-img' src={portfolio} onClick={onPortfolio}/>
            <img className='price-list-img' src={prices} onClick={onPrices}/>
        </div>
        
    )
}

export default SideBar;