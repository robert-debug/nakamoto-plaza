import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { makeTransfers, requestTransfers } from '../../store/transfer'
import { DisplayStateContext } from '../../context/Display'
import { coinIdObj } from '../../utilities'
import { requestTransactions } from "../../store/transaction";
import { requestUserCoins } from "../../store/coins";
const BuySellForm = ({ props }) =>{
    const history = useHistory()
    const setShowModal = props.setShowModal
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin.list)
    const sessionId = useSelector(state => state.session.user.id)
    const [coinAmt, setCoinAmt] = useState(0);
    const [receiverIdentification, setReceiverIdentification ] = useState('')
    const [coinSymbol, setCoinSymbol] = useState('BTC');
    const { showDisplay, setShowDisplay} = useContext(DisplayStateContext)

    const onSubmit = (e)=> {
        e.preventDefault();
        const coinId = coinIdObj[coinSymbol]
        dispatch(makeTransfers(sessionId, receiverIdentification, coinAmt, coinId, sessionId))
        dispatch(requestTransfers(sessionId))
        dispatch(requestUserCoins(sessionId))
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
                    onChange={updateReceiver}
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
