import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { DisplayStateContext } from '../context/Display'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfer'
import { requestSparklineWeekly, requestUserCoins, requestCoins, requestSparklineIntraDay, requestSparklineDaily, requestOneCoin } from '../store/coins'
import Prices from './Prices'
import Portfolio from './Portfolio'
import Home from './Home'
import Coin from './Coin'
import { CoinStateContext } from '../context/CoinContext'
const MainDisplay = () =>{
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const { showDisplay, setShowDisplay } = useContext(DisplayStateContext)
    const { coinDisplay } = useContext(CoinStateContext)
    
    useEffect(()=>{
        setShowDisplay('Home')
        dispatch(requestSparklineIntraDay(coinDisplay))
    }, [])

    useEffect(()=>{
        dispatch(requestCoins());
        dispatch(requestOneCoin(coinDisplay))
        dispatch(requestUserCoins(sessionUser.id))
        dispatch(requestTransactions(sessionUser.id))
        dispatch(requestTransfers(sessionUser.id))
    }, [showDisplay, coinDisplay])

    

    return(
        <div className='main-display'>
            {showDisplay === 'Home' ? <Home /> : null}
            {showDisplay === 'Portfolio' ? <Portfolio /> : null}
            {showDisplay === 'Prices' ? <Prices/> : null}
            {showDisplay === 'coin' ? <Coin /> : null}
        </div>
    )
}
export default MainDisplay