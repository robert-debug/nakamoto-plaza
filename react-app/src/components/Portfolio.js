import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfers'
const Prices = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin.list)
    const userCoins = useSelector(state => state.coin.userCoins)
    const transactions = useSelector(state => state.transaction.list)
    const transfers = useSelector(state => state.transfer.list)
    
    useEffect(()=>{
        dispatch(requestCoins());
        dispatch(requestUserCoins(sessionUser.id))
        dispatch(requestTransactions(sessionUser.id))
        dispatch(requestTransfers(sessionUser.id))
    }, [dispatch])
    if (!coins) return null
    if (!userCoins) return null
    const amount = (amount, symbol) =>{
        amount * coins[symbol].price
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
                            console.log(coin)
                            return (
                            <tr>
                                <td>{console.log(coin)}
                                    <img alt={`${coins[coin.symbol]}-logo`}src={coins[coin.symbol].logo_url} className='coin-logo'/>
                                    <span>{coin.name}</span>
                                    <span>{coin.symbol}</span>
                                </td>
                                <td>{amount(coin.amount, coins[coin.symbol].price)}</td>
                                <td>{amount(coin.amount, coins[coin.symbol].price)/denominator()}%</td>
                            </tr>
                            )})}
                    </tbody>
            </table>
            <div className='transaction-div'>
                {

                }
            </div>
            <div className='transfer-div'>
                
            </div>
            
        </>
    )
}

export default Prices;