import React, {useEffect, useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createChart } from 'lightweight-charts';

const Home = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const coin = useSelector(state => state.coin.coin)
    const CoinChart = createChart(document.body, { 
        width: 500, height: 400
  });
    const line
    
    useEffect(()=>{
        dispatch(requestUserCoins(sessionUser.id))
    }, [dispatch])
    
    console.log(userCoins)
    
    if (!coins['BTC']) return null
    if (!userCoins) return null
    if (!coin) return null

    return (
        <>
            <CoinChart />
        </>
    )
}

export default Home