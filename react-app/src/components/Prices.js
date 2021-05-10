import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestOneCoin } from '../store/coins'
const Prices = () =>{
    const dispatch = useDispatch(); 
    const coins = useSelector(state => state.coin.list)
    const { showDisplay, setShowDisplay } = useContext(DisplayStateContext);
    const [selectedCoin, setSelectedCoin] = useState('BTC')
    
    if (!coins) return null
    const onClick = (id) =>{
        setShowDisplay('coin')
        dispatch(requestOneCoin(id))
    }

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
                                <td key={coin.id} value={coin.id} onClick={() => onClick(coin.id)}>{console.log(coin)}
                                    <img alt={`${coin.id}-logo`}src={coin.logo_url} className='coin-logo'/>
                                    <span value={coin.id}>{coin.name}</span>
                                    <span value={coin.id}>{coin.symbol}</span>
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