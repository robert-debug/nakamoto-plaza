import React, {useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins, requestSparklineIntraDay } from '../store/coins'
import BuySellFormModal from './BuySellFormModal/index'
import { requestOneCoin } from '../store/coins'
import { CoinStateContext } from '../context/CoinContext'

const Prices = () =>{
    const dispatch = useDispatch(); 
    const coins = useSelector(state => state.coin.list)
    const { showDisplay, setShowDisplay } = useContext(DisplayStateContext);
    // const [selectedCoin, setSelectedCoin] = useState('BTC')
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    if (!coins) return 'Loading... Please refresh if loading is prolonged...'
    const onClick = (id) =>{
        setShowDisplay('coin')
        setCoinDisplay(id)
        dispatch(requestOneCoin(id))
        dispatch(requestSparklineIntraDay(id))
        // setSelectedCoin(id)
    }

    return(
        <div className="prices-container">
            <div className='chart-div' id='chart-div'>
                
            </div>
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
                                <td key={coin.id} value={coin.id} className='prices-coins' onClick={() => onClick(coin.id)}>{console.log(coin)}
                                    <img alt={`${coin.id}-logo`}src={coin.logo_url} className='coin-logo'/>
                                    <span value={coin.id}>    {coin.name}  </span>
                                    <span value={coin.id}>    {coin.symbol}  </span>
                                </td>
                                <td>${parseFloat(coin.price).toFixed(2)}</td>
                                <td>{(coin['1d'].price_change_pct * 100).toFixed(2)}.%</td>
                                <td>${new Intl.NumberFormat().format(coin.market_cap)}</td>
                                <td><BuySellFormModal props={'1h'}/></td>
                            </tr>
                            )})}
                    </tbody>
            </table>
            
        </div>
    )
}

export default Prices;