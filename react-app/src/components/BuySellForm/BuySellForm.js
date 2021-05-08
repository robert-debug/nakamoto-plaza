import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getCoins } from '../../store/session';
import { makeTransaction } from '../../store/transactfers'
const BuySellForm = ({ props }) =>{
    const setShowModal = props.setShowModal
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin)
    const price = useSelector(state => state.coin.coin.price)
    const sessionId = useSelector(state => state.session.user.id)
    const [purchase, setPurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(price);
    const coinIdObj = {'BTC': 1, 'ETH': 2, 'DOGE': 3, 'XRP':4, 'ADA': 5, 'UNI': 6, 'LTC': 7, 'XLM': 8, 'ETC': 9, 'TRX': 10, 'AAVE': 11, 'Cosmos': 12}
    const [coin, setCoin] = useState(0);
    const fiatId = 1;
    setCoin(props.coin)

    const onSubmit = (e)=> {
        const coinId = coinIdObj[coin]
        dispatch(makeTransaction(coinAmt, purchase, fiatPrice, fiatId, coinId, sessionId))
    }

    const onFiat = (e) => {
        const paymentAmount = e.target.value
        setFiatPrice(paymentAmount)
        const amount = e.target.value / coin.price
        setCoinAmt(amount)
    }

    const onSell = (e) => {
        setPurchase(False)
    }

    
    const onBuy = (e) => {
        setPurchase(True)
    }

    const updateCoin = (e) => {
        setCoin(e.target.value)
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

export default BuySellForm; 
