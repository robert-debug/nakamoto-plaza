import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestSparkline, requestSparklineIntraDay, requestUserCoins, requestOneCoin, requestCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import Chart from './Chart'
import { CoinStateContext } from '../context/CoinContext'

const Home = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    // const [ selectedCoin, setSelectedCoin ] = useState('BTC')
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    if (!coins['ETH']) return(<p>Loading...</p>) 
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
        setCoinDisplay(symbol)
        dispatch(requestSparklineIntraDay(symbol))
        this.forceUpdate()
    }
    return (
        <>
            <div className='chart-div'>
            <div className='chart-top-div'>
                <h2>{coins[coinDisplay].price}</h2>
                <img alt={`${coins[coinDisplay].id}-logo`}src={coins[coinDisplay].logo_url} className='coin-logo'/>
                <span value={coins[coinDisplay].id}>{coins[coinDisplay].name}</span>
                <span value={coins[coinDisplay].id}>{coins[coinDisplay].symbol}</span>
            </div>
                <Chart props={coinDisplay}/>

            </div>
            <div className='home-info-div'>
                {userCoins.map( coin => {
                    if(coin.amount === 0) return null
                    return (
                        <div onClick={() => onClick(coins[idCoinObj[coin.coin_id]].id)}>
                            <img alt={`${coins[idCoinObj[coin.coin_id]].id}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                            <span>{coins[idCoinObj[coin.coin_id]].name}</span>
                            <span>{coins[idCoinObj[coin.coin_id]].symbol}</span>
                            <span>$ {(amount(coin.amount, idCoinObj[coin.coin_id])).toFixed(2)}</span>
                        </div>
                                )})}
            </div>
        </>
    )
}

export default Home