import React, {useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DisplayStateContext } from '../context/Display'
import { requestCoins } from '../store/coins'
const Prices = () =>{
    const dispatch = useDispatch();
    const { showDisplay } = useContext(DisplayStateContext) 
    const coins = useSelector(state => state.coin.list)
    const onClick = (e)=>{
        return null
    }
    useEffect(()=>{
        dispatch(requestCoins());
    }, [dispatch])
    console.log(coins)
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
                                <td onClick={onClick}><div className='prices-buy-button'>Buy</div></td>
                            </tr>
                            )})}
                    </tbody>
            </table>
        </>
    )
}

export default Prices;