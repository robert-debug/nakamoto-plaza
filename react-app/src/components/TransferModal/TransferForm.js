import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { makeTransaction } from '../../store/transaction'
import { DisplayStateContext } from '../../context/Display'
const BuySellForm = ({ props }) =>{
    const history = useHistory()
    const setShowModal = props.setShowModal
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin.list)
    const sessionId = useSelector(state => state.session.user.id)
    const [coinAmt, setCoinAmt] = useState(0);
    const [receiverIdentification, setReceiverIdentification ] = useState('')
    const coinIdObj = {'BTC': 1, 'ETH': 2, 'DOGE': 3, 'XRP':4, 'ADA': 5, 'UNI': 6, 'LTC': 7, 'XLM': 8, 'ETC': 9, 'TRX': 10, 'AAVE': 11, 'Cosmos': 12}
    const [coinSymbol, setCoinSymbol] = useState('BTC');
    const { showDisplay, setShowDisplay} = useContext(DisplayStateContext)

    const onSubmit = (e)=> {
        e.preventDefault();
        const coinId = coinIdObj[coinSymbol]
        dispatch(makeTransaction(sessionId, receiverIdentification, coinAmt, coinId, sessionId))
        setShowModal(false)
        setShowDisplay('Portfolio')
        history.push('/')
    }

    const updateAmount = (e) => {
        const amount = e.target.value
        setCoinAmt(amount)
    }

    const updateCoin = (e) => {
        setCoinSymbol(e.target.value)
    }

    const updateReceiver = (e) => {
        setReceiverIdentification(e.target.value)
    }

    return(
        <div className='form-div'>
              <div>Transfer</div>
              <form onSubmit={onSubmit}>
                 <input
                    type="number"
                    name="coinAmt"
                    onChange={updateAmount}
                    value={coinAmt}
                ></input>
                <label>To:</label>
                <input
                    type= 'text'
                    name= 'receiverIdentification'
                    placeholder= 'Email'
                    value={receiverIdentification}
                ></input>
                <select value={coinSymbol} onChange={updateCoin}>
                {
                    coins.map(coin => (
                            <option key={coin.id} value={coin.symbol}>{coin.name}</option>
                    ))
                }
                </select>
                <button type="submit">Transfer {coinSymbol}</button>
            </form>
        </div>
    )
}

export default BuySellForm; 
