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
    const [purchase, setPurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(price);
    const coinIdObj = {'BTC': 1, 'ETH': 2, 'DOGE': 3, 'XRP':4, 'ADA': 5, 'UNI': 6, 'LTC': 7, 'XLM': 8, 'ETC': 9, 'TRX': 10, 'AAVE': 11, 'Cosmos': 12}
    const fiatId = 1;
    const [coin, setCoin] = useState('');
    if (coinId === '') setCoinId('BTC')
    const onSubmit = (e)=> {

    }

    const onFiat = (e) => {
        const paymentAmount = e.target.value()
        setFiatPrice(e.target.value)
        
        setAmount()
    }

    const onSell = (e) => {
        setPurchase(False)
    }

    
    const onBuy = (e) => {
        setPurchase(True)
    }

    const updateCoin = (e) => {
        setCoinId(coinIdObj[e.target.value])
    }

    return(
        <div>
              <div onClick={onBuy}>Buy</div><div onClick={onSell}>Sell</div>
              <form onSubmit={onSubmit}>
                 <input
                    type="number"
                    name="fiatprice"
                    onChange={onFiat}
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
                <button type="submit">Buy {coin.name}</button>
            </form>
        </div>
    )

}
