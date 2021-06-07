import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { DisplayStateContext } from '../../context/Display'
import { makeTransaction, requestTransactions } from '../../store/transaction'
import { coinIdObj } from '../../utilities'
import { requestUserCoins } from '../../store/coins'

const BuySellForm = ({ props }) =>{

    const history = useHistory()
    const setShowModal = props.setShowModal
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin.list)
    const priceFinder = useSelector(state => state.coin)
    const errors = useSelector(state=> state.transaction.errors )
    const sessionId = useSelector(state => state.session.user.id)
    const [purchaseErrors, setErrors] = useState([]);
    const [purchase, setPurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(0);
    const coinIdObj = {'BTC': 1, 'ETH': 2, 'DOGE': 3, 'XRP':4, 'ADA': 5, 'UNI': 6, 'LTC': 7, 'XLM': 8, 'ETC': 9, 'TRX': 10, 'AAVE': 11, 'Cosmos': 12}
    const [coinSymbol, setCoinSymbol] = useState(props.coin);
    const { showDisplay, setShowDisplay} = useContext(DisplayStateContext)
    const [purchaseCompleted, setPurchaseCompleted] = useState(false)
    const fiatId = 1;


    const onSubmit = (e)=> {
        e.preventDefault();
        if(coinAmt > 0){
        const coinId = coinIdObj[coinSymbol]
        dispatch(makeTransaction(coinAmt, fiatPrice, purchase,  fiatId, coinId, sessionId))
        setPurchaseCompleted(true)
        } else {
            setErrors(['Please select a value greater than $0.'])
        }
    }
    const onComplete = (e)=>{
        dispatch(requestTransactions(sessionId))
        dispatch(requestUserCoins(sessionId))
        setShowDisplay('Home')
        setPurchaseCompleted(false)
        setShowModal(false)
    }
    const onFailure = (e)=>{
        dispatch(requestTransactions(sessionId))
        dispatch(requestUserCoins(sessionId))
        setShowDisplay('Home')
        setPurchaseCompleted(false)
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
    if (!coins ||!priceFinder) return null

    return(
        <>
        {
            !purchaseCompleted ?
        <div className='form-div'>
            {purchaseErrors.map((error) => (
            <div>{error}</div>
            ))}
            <div className='buy-sell'>
                <div className={purchase ? 'buy-card-selected' : 'not-selected'} onClick={onBuy}>
                    <span>Buy</span></div>
                    <div className={!purchase ? 'sell-card-selected' : 'not-selected'} onClick={onSell}>
                        <span>Sell</span>
                    </div>
            </div>
              <form onSubmit={onSubmit}>
                  <div className='money-input-div'>
                    <i>$</i>
                    <input
                       className='number-input'
                       type="number"
                       name="fiatprice"
                       onChange={onFiat}
                       value={fiatPrice}
                       min='0'
                    ></input>
                  </div>

                <label className='coin-price-label'>Price per coin: {priceFinder[coinSymbol].price}</label>
                <div className='coin-select'>
                <select value={coinSymbol} onChange={updateCoin}>
                {
                    coins.map(coin => (
                            <option key={coin.id} value={coin.symbol}>   {coin.name}</option>
                    ))
                }
                </select>
                </div>
                <button className='form-buy-button' type="submit">{purchase === true ? 'Buy' : 'Sell' } {coinSymbol}</button>
            </form>
        </div> :
        <div classname='form-div'>
            {errors ?    errors.map(error => (
                            <div className='completed-div' key={error} style={{backgroundColor:"white", borderRadius: '5px', width: '300px', padding:'10px' }}>
                                <p className='errors'>Errors:</p>
                                <p classnam='errors' >{error}</p>
                                <button className='form-buy-button' onClick={onFailure}>Continue</button>
                            </div>
                    )):<>
                    <div className='completed-div' style={{backgroundColor:"white", borderRadius: '5px', width: '300px', padding:'10px' }}>
                        <p style={{fontFamily: "'Roboto', sans-serif", marginLeft:'30px' }}>Your Transaction Was Successful!</p>
                        <button className='form-buy-button' onClick={onComplete}>Complete!</button>
                    </div>
                    </>
                    }
        </div>
        }
        </>
    )
}

export default BuySellForm; 
