import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestUserCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestTransactions } from '../store/transaction';
import { requestTransfers } from '../store/transfer'
import { coinIdObj } from '../utilities'
import { idCoinObj } from '../utilities'

const PieChart = () =>{
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
    

    return(
        <>
        </>
    )

}

export default PieChart;