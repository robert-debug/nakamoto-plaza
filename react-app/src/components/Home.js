import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestSparkline, requestSparklineWeekly, requestSparklineOneDay, requestSparklineDaily, requestSparklineIntraDay, requestUserCoins, requestOneCoin, requestCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import Chart from './Chart'
import { CoinStateContext } from '../context/CoinContext'
import { ChartStateContext } from '../context/ChartContext'

const Home = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext)
    const [hourBackground, changeHourBackground] = useState(true)
    const [dayBackground, changeDayBackground] = useState(false)
    const [weekBackground, changeWeekBackground] = useState(false)
    const [monthBackground, changeMonthBackground] = useState(false)
    const [yearBackground, changeYearBackground] = useState(false)
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    const { chartDisplay, setChartDisplay } = useContext(ChartStateContext)
    const [selectedCoin, setSelectedCoin] = useState(coinDisplay)
    console.log(selectedCoin)
    if (!coins[selectedCoin]) return(<p>Loading... Please refresh if loading is prolonged...</p>) 
    if (!userCoins) return(<p>Loading... Please refresh if loading is prolonged...</p>)
    const amount = (amount, symbol) => {
        return amount * coins[symbol].price
    }


    let biggest = 0;
    for (let i = 0; i < userCoins?.length; i++){
        const newAmount = amount(userCoins[i]?.amount, coins[idCoinObj[userCoins[i].coin_id]].id)
        const biggestAmount = amount(userCoins[biggest]?.amount, coins[idCoinObj[userCoins[biggest].coin_id]].id)
        if(newAmount > biggestAmount) biggest = i
    }
    setCoinDisplay(coins[idCoinObj[userCoins[biggest]?.coin_id]]?.id)

    const onClick = (symbol) => {
        console.log(symbol)
        setCoinDisplay(symbol)
        setSelectedCoin(symbol)
        setChartDisplay('1h')
        changeHourBackground(true)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineIntraDay(symbol))
    }
    const onHour = (symbol) => {
        setCoinDisplay(selectedCoin)
        setChartDisplay('1h')
        changeHourBackground(true)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineIntraDay(selectedCoin))
    }
    const onDay = (symbol) => {
        console.log(coinDisplay)
        setChartDisplay('1d')
        changeHourBackground(false)
        changeDayBackground(true)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineOneDay(selectedCoin))
    }
    const onWeek = (symbol) => {
        setChartDisplay('1w')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(true)
        changeMonthBackground(false)
        changeYearBackground(false)
        dispatch(requestSparklineDaily(selectedCoin))
    }
    const onMonth = (symbol) => {
        setChartDisplay('1m')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(true)
        changeYearBackground(false)
        dispatch(requestSparklineDaily(selectedCoin))
    }
    const onYear = (symbol) => {
        setChartDisplay('1y')
        changeHourBackground(false)
        changeDayBackground(false)
        changeWeekBackground(false)
        changeMonthBackground(false)
        changeYearBackground(true)
        dispatch(requestSparklineWeekly(selectedCoin))
    }
    console.log('hour', hourBackground, 'day', dayBackground)
    return (
        <>
        <div className='chart-div'>
            
            <div className='chart-top-div'>
                <div id='chart-header-info'>
                    <h2 className= 'coin-price'>${parseFloat(coins[selectedCoin].price).toFixed(2)}</h2>
                    <img alt={`${coins[selectedCoin].id}-logo`}src={coins[selectedCoin].logo_url} className='coin-logo'/>
                    <span value={coins[selectedCoin].id}>{coins[selectedCoin].name}</span>
                    <span value={coins[selectedCoin].id}>{coins[selectedCoin].symbol}</span>
                </div>
                <div id='time-span-div'>
                    <span className='time-span' onClick={onHour} style={hourBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}} >   1H   </span>
                    <span className='time-span' onClick={onDay} style={dayBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>   Day   </span>
                    <span className='time-span' onClick={onWeek} style={weekBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>   Week   </span>
                    <span className='time-span' onClick={onMonth} style={monthBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>  Month  </span>
                    <span className='time-span' onClick={onYear} style={yearBackground ? {'backgroundColor' : '#ADD8E6'} : {'background-color' : 'FFFFFF'}}>  1/2Year  </span>
                </div> 
            </div>
                <Chart props={coinDisplay, chartDisplay}/>

            </div>
            <h3 className='home-portfolio-h1'>Your Portfolio</h3>
            <div className='home-info-div'>
                {userCoins.map( (coin, i) => {
                    if(coin.amount === 0) return null
                    return (
                        <div className='home-coins' key={i} onClick={() => onClick(coins[idCoinObj[coin.coin_id]].id)}>
                            <img  alt={`${coins[idCoinObj[coin.coin_id]].id}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                            <span >  {coins[idCoinObj[coin.coin_id]].name}  </span>
                            <span >  {coins[idCoinObj[coin.coin_id]].symbol}  </span>
                            <span >$ {(amount(coin.amount, idCoinObj[coin.coin_id])).toFixed(2)}</span>
                            <span >  {coins.amount}  </span>
                        </div>
                            )})}
        </div>
        </>
    )
}
export default Home