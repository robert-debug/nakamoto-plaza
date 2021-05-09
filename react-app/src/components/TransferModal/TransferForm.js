import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { requestCoins } from '../../store/coins';
import { makeTransaction } from '../../store/transaction'
const BuySellForm = ({ props }) =>{
    console.log(props.coin)
    const setShowModal = props.setShowModal
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin.list)
    const priceFinder = useSelector(state => state.coin)
    console.log(priceFinder)
    const sessionId = useSelector(state => state.session.user.id)
    const [purchase, setPurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(0);
    const coinIdObj = {'BTC': 1, 'ETH': 2, 'DOGE': 3, 'XRP':4, 'ADA': 5, 'UNI': 6, 'LTC': 7, 'XLM': 8, 'ETC': 9, 'TRX': 10, 'AAVE': 11, 'Cosmos': 12}
    const [coinSymbol, setCoinSymbol] = useState(props.coin);
    const fiatId = 1;

    const onSubmit = (e)=> {
        e.preventDefault();
        const coinId = coinIdObj[coinSymbol]
        dispatch(makeTransaction(coinAmt, fiatPrice, purchase,  fiatId, coinId, sessionId))
        setShowModal(false)
    }

    const onFiat = (e) => {
        const paymentAmount = e.target.value
        setFiatPrice(paymentAmount)
        const amount = e.target.value / priceFinder[coinSymbol].price
        setCoinAmt(amount)
    }

    const onSell = (e) => {
        setPurchase(false)
    }

    
    const onBuy = (e) => {
        setPurchase(true)
    }

    const updateCoin = (e) => {
        setCoinSymbol(e.target.value)
    }

    return(
        <div className='form-div'>
              <div onClick={onBuy}>Buy</div><div onClick={onSell}>Sell</div>
              <form onSubmit={onSubmit}>
                 <input
                    type="number"
                    name="fiatprice"
                    onChange={onFiat}
                    value={fiatPrice}
                ></input>
                <label>Price per coin: {priceFinder[coinSymbol].price}</label>
                <select value={coinSymbol} onChange={updateCoin}>
                {
                    coins.map(coin => (
                            <option key={coin.id} value={coin.symbol}>{coin.name}</option>
                    ))
                }
                </select>
                <button type="submit">Buy {coinSymbol}</button>
            </form>
        </div>
    )
}

export default BuySellForm; 
