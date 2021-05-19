import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestUserCoins, requestSparklineDaily, requestSparklineOneDay, requestSparklineWeekly, requestSparklineIntraDay } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import Chart from './Chart'
import { coinDisplay } from '../context/CoinContext'
import { CoinStateContext } from '../context/CoinContext'
import { ChartStateContext } from '../context/ChartContext'

const Coin = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coin = useSelector(state => state.coin.coin)
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    const { chartDisplay, setChartDisplay } = useContext(ChartStateContext)
    
    if (!coin) return null

    const onHour = (symbol) => {
        setChartDisplay('1h')
        dispatch(requestSparklineIntraDay(coinDisplay))
    }
    const onDay = (symbol) => {
        setChartDisplay('1d')
        dispatch(requestSparklineOneDay(coinDisplay))
    }
    const onWeek = (symbol) => {
        setChartDisplay('1w')
        dispatch(requestSparklineDaily(coinDisplay))
    }
    const onMonth = (symbol) => {
        setChartDisplay('1m')
        dispatch(requestSparklineDaily(coinDisplay))
    }
    const onYear = (symbol) => {
        setChartDisplay('1y')
        dispatch(requestSparklineWeekly(coinDisplay))
    }
    return (
        <>
            <div className='chart-div'>
                <div className='chart-top-div'>
                    <div classname='chart-header-info'>
                        <h2>  ${parseFloat(coin?.price).toFixed(2)}  </h2>
                        <img alt={`${coin?.id}-logo`}src={coin?.logo_url} className='coin-logo'/>
                        <span>  {coin?.name} </span>
                        <span> {coin?.symbol} </span>
                    </div>
                    <div className='coin-time-span-div'>
                        <span className='time-span' onClick={onHour}>  1H  </span>
                        <span className='time-span' onClick={onDay}>  Day  </span>
                        <span className='time-span' onClick={onWeek}>  Week  </span>
                        <span className='time-span' onClick={onMonth}>  Month  </span>
                        <span className='time-span' onClick={onYear}>  1/2Year  </span>
                    </div>
                </div>
                <Chart props={chartDisplay}/>

            </div>
            <div className='coin-info-div'>
                            < img alt={`${coin?.id}-logo`}src={coin?.logo_url} className='coin-logo'/>
                            <span> {coin?.name}  </span>
                            <span>|  Volume: {coin['1d']?.volume}  </span>
                            <span>|  Market Cap: ${coin?.market_cap}  </span>
                            <span>|  Circulating Supply: {coin?.circulating_supply}  </span>
                            <span>|  Max Supply {!coin.max_supply ? 'NA' : coin.max_supply}  </span>

            </div>
        </>
    )
}

export default Coin