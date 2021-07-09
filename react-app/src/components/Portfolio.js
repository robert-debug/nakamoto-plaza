import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfer'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import PieChart from './PieChart'

const Portfolio = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const transactions = useSelector(state => state.transaction.list)
    const transfers = useSelector(state => state.transfer.list)
    

    if (!coins['BTC']) return 'Loading... Please refresh if loading is prolonged...'
    if (!userCoins) return 'Loading... Please refresh if loading is prolonged...'
    if (!transactions) return 'Loading... Please refresh if loading is prolonged...'
    if (!transfers) return 'Loading... Please refresh if loading is prolonged...'
    

    const amount = (amount, symbol) => {
        return amount * coins[symbol].price
    }

    const denominator = () =>{
        let num = 0
        for (let i = 0; i < userCoins.length; i++){
            const add = userCoins[i].amount * coins[idCoinObj[userCoins[i].coin_id]].price
            num += add
        }
        return num
    }

    return(
        <div className='portfolio-container'>
            <table className='portfolio-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Balance Value</th>
                        <th>Balance</th>
                        <th>Allocation</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {userCoins.map( coin => {
                            return (
                            <tr>
                                <td>
                                    <img alt={`${coins[idCoinObj[coin.coin_id]].id}-logo`}src={coins[idCoinObj[coin.coin_id]].logo_url} className='coin-logo'/>
                                    <span>{coins[idCoinObj[coin.coin_id]].name}</span>
                                    <span>{coins[idCoinObj[coin.coin_id]].symbol}</span>
                                </td>
                                <td>$ {(amount(coin.amount, idCoinObj[coin.coin_id])).toFixed(2)}</td>
                                <td>{coin.amount}</td>
                                <td>{((amount(coin.amount, idCoinObj[coin.coin_id])/denominator()) * 100).toFixed(2)}%</td>
                            </tr>
                            )})}
                    </tbody>
            </table>
            <div className='trans-holder'>                 
                <div className='trans-container'>
                    <h1>Transactions</h1>
                    {
                        transactions.map((transaction, i) => {
                            return(
                            <div key={i} className='trans-div' >
                                {
                                    transaction.purchase ? <h3>Purchase</h3>:<h3>Sale</h3>
                                }
                                <p>  {idCoinObj[transaction.coin_id]}  </p>
                                <p>  ${transaction.fiatprice}  </p>
                                <p>  Token amount: {transaction.coinamt}  </p>
                                <p>  Date: {transaction.date}  </p>
                            </div>)
                        })


                    }
                </div>
                <div className='trans-container'>
                    <h1>Transfers</h1>
                    {
                        transfers.map((transfer, i) => {
                        return(
                            <div key={i} className='trans-div' >
                            <h3>Transfer</h3>
                            <p>  {idCoinObj[transfer.coin_id]}  </p>
                            <p>  Sender: {transfer.sender.email}</p>
                            <p>  Receiver: {transfer.receiver.email}</p>
                            <p>  Token amount: {transfer.coinamt}</p>
                            <p>  Date: {transfer.date}  </p>
                        </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Portfolio;