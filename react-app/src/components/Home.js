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
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    const { chartDisplay, setChartDisplay } = useContext(ChartStateContext)
    const [selectedCoin, setSelectedCoin] = useState(coinDisplay)
    if (!coins[selectedCoin]) return(<p>Loading...</p>) 
    if (!userCoins) return(<p>Loading...</p>)
    const amount = (amount, symbol) => {
        return amount * coins[symbol].price
    }


    let biggest = 0;
    for (let i = 0; i < userCoins?.length; i++){
        const newAmount = amount(userCoins[i]?.amount, coins[idCoinObj[userCoins[i].coin_id]].id)
        const biggestAmount = amount(userCoins[biggest]?.amount, coins[idCoinObj[userCoins[biggest].coin_id]].id)
        console.log(newAmount, biggestAmount, userCoins[i]?.coin_id, userCoins[biggest]?.coin_id)
        if(newAmount > biggestAmount) biggest = i
    }
    setCoinDisplay(coins[idCoinObj[biggest]]?.id)

    const onClick = (symbol) => {
        setSelectedCoin(symbol)
        setCoinDisplay(symbol)
        setChartDisplay('1h')
        dispatch(requestSparklineIntraDay(symbol))
    }
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
                <h2 className= 'coin-price'>${coins[selectedCoin].price}</h2>
                <img alt={`${coins[selectedCoin].id}-logo`}src={coins[selectedCoin].logo_url} className='coin-logo'/>
                <span value={coins[selectedCoin].id}>{coins[selectedCoin].name}</span>
                <span value={coins[selectedCoin].id}>{coins[selectedCoin].symbol}</span>
            <div>
                <span className='time-span' onClick={onHour}>1H</span>
                <span className='time-span' onClick={onDay}>Day</span>
                <span className='time-span' onClick={onWeek}>Week</span>
                <span className='time-span' onClick={onMonth}>Month</span>
                <span className='time-span' onClick={onYear}>1/2Year</span>
            </div> 
            </div>
                <Chart props={coinDisplay, chartDisplay}/>

            </div>
            <div className='home-info-div'>
                {userCoins.map( coin => {
                    if(coin.amount === 0) return null
                    return (
                        <div className='on-hover' onClick={() => onClick(coins[idCoinObj[coin.coin_id]].id)}>
                            <img alt={`${coins[idCoinObj[coin.coin_id]].id}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                            <span>{coins[idCoinObj[coin.coin_id]].name}</span>
                            <span>{coins[idCoinObj[coin.coin_id]].symbol}</span>
                            <span>$ {(amount(coin.amount, idCoinObj[coin.coin_id])).toFixed(2)}</span>
                            <span>{coins.amount}</span>
                        </div>
                                )})}
            </div>
        </>
    )
}
export default Home