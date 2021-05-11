import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import Chart from './Chart'
const Coin = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coin = useSelector(state => state.coin.coin)
    
    if (!coin) return null

    return (
        <>
            <div className='chart-div'>
                <h1>{coin?.symbol}</h1>
                <Chart props={coin?.symbol}/>
            </div>
            <div className='coin-info-div'>

                        <div>
                            <img alt={`${coin?.id}-logo`}src={coin?.logo_url} className='coin-logo'/>
                            <span>{coin?.name}</span>
                            <span>Market Cap: ${coin?.market_cap}</span>
                            <span>Volume: {coin['1d']?.volume}</span>
                            <span>Circulating Supply: {coin?.circulating_supply}</span>
                            <span>Max Supply {!coin.max_supply ? 'NA' : coin.max_supply}</span>
                        </div>

            </div>
        </>
    )
}

export default Coin