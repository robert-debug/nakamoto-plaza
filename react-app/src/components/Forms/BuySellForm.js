import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getCoins } from '../../store/session';

const BuySellForm = () =>{
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin)
    const selectedCoin = useSelector(state => state.coin.coin)
    const price = useSelector(state => state.coin.coin.price)
    const sessionId = useSelector(state => state.session.user.id)
    const [purchase, setpurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(price);
    const fiatId = 1;
    const [coin, setCoin] = useState('');
    if (coinId === '') setCoinId('BTC')
    const onSubmit = (e)=>{

    }
    const onFiat = (e) =>{
        setFiatPrice(e.target.value)
    }
    const o
    return(
        <div>
            <div onClick={onBuy}>Buy</div><div onClick={onSell}>Sell</div>
            <form onSubmit={onSubmit}>
            <input
            type="number"
            name="fiatprice"
            onChange={onAmount}
            value={`$${fiatPrice}`}
          ></input>
            <select value={usCoin} onChange={updateCoin}>
            {
              coins.map(state => (
                <div>
                    <option key={coin.id} value={coin.symbol}>{coin.name}</option>
                </div>
              ))
            }
          </select>
            </form>
        </div>
    )

}
