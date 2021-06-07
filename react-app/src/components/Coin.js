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
    const [hourBackground, changeHourBackground] = useState(true)
    const [dayBackground, changeDayBackground] = useState(false)
    const [weekBackground, changeWeekBackground] = useState(false)
    const [monthBackground, changeMonthBackground] = useState(false)
    const [yearBackground, changeYearBackground] = useState(false)
    
    if (!coin) return null

    const onHour = (symbol) => {
        setChartDisplay('1h')
        changeHourBackground(true)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineIntraDay(coinDisplay))
    }
    const onDay = (symbol) => {
        setChartDisplay('1d')
        changeHourBackground(false)
        changeDayBackground(true)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineOneDay(coinDisplay))
    }
    const onWeek = (symbol) => {
        setChartDisplay('1w')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(true)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineDaily(coinDisplay))
    }
    const onMonth = (symbol) => {
        setChartDisplay('1m')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(true)
        changeYearBackground(false)
        dispatch(requestSparklineDaily(coinDisplay))
    }
    const onYear = (symbol) => {
        setChartDisplay('1y')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(true)
        dispatch(requestSparklineWeekly(coinDisplay))
    }
    return (
        <>
            <div className='chart-div'>
                <div className='chart-top-div'>
                    <div id='coin-header-info'>
                        <h2>  ${parseFloat(coin?.price).toFixed(2)}  </h2>
                        <img alt={`${coin?.id}-logo`}src={coin?.logo_url} className='coin-logo'/>
                        <span>  {coin?.name} </span>
                        <span> {coin?.symbol} </span>
                    </div>
                    <div className='coin-time-span-div'>
                    <span className='time-span' onClick={onHour} style={hourBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}} >   1H   </span>
                    <span className='time-span' onClick={onDay} style={dayBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>   Day   </span>
                    <span className='time-span' onClick={onWeek} style={weekBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>   Week   </span>
                    <span className='time-span' onClick={onMonth} style={monthBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>  Month  </span>
                    <span className='time-span' onClick={onYear} style={yearBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>  1/2Year  </span>
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