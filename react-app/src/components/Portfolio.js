import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfer'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
const Portfolio = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const transactions = useSelector(state => state.transaction.list)
    const transfers = useSelector(state => state.transfer.list)
    
    useEffect(()=>{
        dispatch(requestUserCoins(sessionUser.id))
        dispatch(requestTransactions(sessionUser.id))
        dispatch(requestTransfers(sessionUser.id))
    }, [dispatch])
    if (!coins['BTC']) return null
    if (!userCoins) return null
    if (!transactions) return null
    if (!transfers) return null
    
    console.log(userCoins)
    const amount = (amount, symbol) => {
        return amount * coins[symbol].price
    }

    const denominator = () =>{
        let num = 0
        for (let i = 0; i < userCoins.length; i++){
            console.log(userCoins[i])
            console.log(coins[idCoinObj[userCoins[i].coin_id]], idCoinObj[userCoins[i].coin_id])
            const add = userCoins[i].amount * coins[idCoinObj[userCoins[i].coin_id]].price
            num += add
        }
        return num
    }

    return(
        <>
            <table className='Portfolio-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Allocation</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {userCoins.map( coin => {
                            console.log(idCoinObj[coin.coin_id], coins[idCoinObj[coin.coin_id]])
                            return (
                            <tr>
                                <td>{console.log(coins)}
                                    <img alt={`${coins[idCoinObj[coin.coin_id]].id}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                                    <span>{coins[idCoinObj[coin.coin_id]].name}</span>
                                    <span>{coins[idCoinObj[coin.coin_id]].symbol}</span>
                                </td>
                                <td>$ {(amount(coin.amount, idCoinObj[coin.coin_id])).toFixed(2)}</td>
                                <td>{((amount(coin.amount, idCoinObj[coin.coin_id])/denominator()) * 100).toFixed(2)}%</td>
                            </tr>
                            )})}
                    </tbody>
            </table>
            <div className='trans-container'>
                {
                    transactions.map((transaction, i) => {
                        return(
                        <div key={i} className='trans-div' >
                            {
                                transaction.purchase ? <h1>Purchase</h1>:<h1>Sale</h1>
                            }
                            <span>{idCoinObj[transaction.coin_id]}</span>
                            <span>${transaction.fiatprice}</span>
                            <span>Token amount: {transaction.coinamt}</span>
                            <span>Date: {transaction.date}</span>
                        </div>)
                    })
                        
                    
                }
            </div>
            <div className='trans-div'>
                {
                    transfers.map((transfer, i) => {
                    return(
                        <div key={i} className='trans-div' >
                        <h1>Transfer</h1>
                        <span>{idCoinObj[transfer.coin_id]}</span>
                        <span>Sender: {transfer.sender.email}</span>
                        <span>Receiver: {transfer.receiver.email}</span>
                        <span>Token amount: {transfer.coinamt}</span>
                        <span>Date: {transfer.date}</span>
                    </div>)
                    })
                }
            </div>
            
        </>
    )
}

export default Portfolio;