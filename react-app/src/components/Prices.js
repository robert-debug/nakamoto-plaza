import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
const Prices = () =>{
    const dispatch = useDispatch();
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin.list)

    useEffect(()=>{
        dispatch(requestCoins());
    }, [dispatch])

    if (!coins) return null

    return(
        <>
            <table className='prices-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Market cap</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {coins.map( coin => {
                            console.log(coin)
                            return (
                            <tr>
                                <td>{console.log(coin)}
                                    <img alt={`${coin.id}-logo`}src={coin.logo_url} className='coin-logo'/>
                                    <span>{coin.name}</span>
                                    <span>{coin.symbol}</span>
                                </td>
                                <td>{coin.price}</td>
                                <td>{coin['1d'].price_change_pct * 100}%</td>
                                <td>{coin.market_cap}</td>
                                <td><BuySellFormModal props={{'coin':coin.symbol}}/></td>
                            </tr>
                            )})}
                    </tbody>
            </table>
            
        </>
    )
}

export default Prices;