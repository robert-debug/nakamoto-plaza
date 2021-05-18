import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import portfolio from '../image-assets/suitcase-icon.svg'
import prices from '../image-assets/price-list.svg'
import home from '../image-assets/home-button.svg'
import { DisplayStateContext } from '../context/Display'
import github from '../image-assets/GitHub-Mark.png'
import linkedIn from '../image-assets/linkedin.png'
import angel from '../image-assets/angellist-icon.png'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { showDisplay, setShowDisplay } = useContext(DisplayStateContext);
    const onHome = (e)=> {
        setShowDisplay('Home');
    }
    const onPortfolio = (e)=> setShowDisplay('Portfolio')
    const onPrices = (e)=> setShowDisplay('Prices')
    return (
        <div className='sidebar container'>
            <div className='sidebar'>
                <img className='home-img' src={home} onClick={onHome}/>
                <img className='portfolio-img' src={portfolio} onClick={onPortfolio}/>
                <img className='price-list-img' src={prices} onClick={onPrices}/>
                <a href='https://github.com/robert-debug/nakamoto-plaza'>
                    <img className='github-icon' src={github}  />
                </a>
                <a href='https://www.linkedin.com/in/robert-george-b5568b28/'>
                    <img className='linkedin-icon' src={linkedIn}  />
                </a>
                <a href='https://angel.co/u/robert-george-11'>
                    <img className='angel-icon' src={angel}  />
                </a>
            </div>
            <a className='nomics-link' target="_blank" href="https://nomics.com">{'Crypto Market Cap & Pricing Data Provided By Nomics'}</a>
        </div>
            
        
    )
}

export default SideBar;