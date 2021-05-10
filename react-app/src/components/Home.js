import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestSparkline, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'

const Home = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)

    useEffect(()=>{
        dispatch(requestUserCoins(sessionUser.id))
        dispatch(requestSparkline())
    }, [dispatch])

    if (!coins['BTC']) return null
    if (!userCoins) return null

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

    return (
        <>
            <div className='chart-div'>
                <h1>{idCoinObj[userCoins[biggest].coin_id]}</h1>

            </div>
            <div className='home-info-div'>
                {userCoins.map( coin => {
                    if(coin.amount === 0) return null
                    return (
                        <div>
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