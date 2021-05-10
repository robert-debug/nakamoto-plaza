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
    console.log(coins)
    const userCoins = useSelector(state => state.coin.userCoins)
    const transactions = useSelector(state => state.transaction.list)
    const transfers = useSelector(state => state.transfer.list)

    useEffect(()=>{
        dispatch(requestUserCoins(sessionUser.id))
        dispatch(requestTransactions(sessionUser.id))
        dispatch(requestTransfers(sessionUser.id))
    }, [dispatch])
    if (!coins[1]) return null
    if (!userCoins) return null
    if (!transactions) return null
    if (!transfers) return null

    const amount = (amount, symbol) => {
        console.log(symbol)
        return amount * coins[idCoinObj[symbol]].price
    }

    const denominator = () =>{
        let num = 0
        for (let i = 0; i < userCoins.length; i++){
            const add = userCoins[i].amount * coins[userCoins[i].symbol].price
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
                                    <img alt={`${coins[idCoinObj[coin.coin_id]]}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                                    <span>{coins[coinIdObj[coin.coin_id]]}</span>
                                    <span>{coins[idCoinObj[coin.coin_id]]}</span>
                                </td>
                                <td>{amount(coin.amount, coins[idCoinObj[coin.coin_id]])}</td>
                                <td>{amount(coin.amount, coins[idCoinObj[coin.coin_id]])/denominator()}%</td>
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
                    </div>)
                    })
                }
            </div>
            
        </>
    )
}

export default Portfolio;