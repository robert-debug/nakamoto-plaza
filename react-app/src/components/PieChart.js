import React, {useEffect, useContext, useState, PureComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfer'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const PieChartComponent = () =>{
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

    let data = userCoins.map(coin =>{
        return {'name': coins[idCoinObj[coin.coin_id]].name, 'value':parseInt(amount(coin.amount, idCoinObj[coin.coin_id]).toFixed(0))}

    })
    console.log(data)

    return(
        <>
        <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        </PieChart>
        </>
    )

}

export default PieChartComponent;