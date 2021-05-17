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
    const errors = useSelector(state=> state.transfer.errors )
    const [coinAmt, setCoinAmt] = useState(0);
    const [receiverIdentification, setReceiverIdentification ] = useState('')
    const [coinSymbol, setCoinSymbol] = useState('BTC');
    const { showDisplay, setShowDisplay} = useContext(DisplayStateContext)
    const [purchaseCompleted, setPurchaseCompleted] = useState(false)

    const onSubmit = (e)=> {
        e.preventDefault();
        const coinId = coinIdObj[coinSymbol]
        dispatch(makeTransfers(sessionId, receiverIdentification, coinAmt, coinId, sessionId))
        dispatch(requestTransfers(sessionId))
        dispatch(requestUserCoins(sessionId))
        setPurchaseCompleted('true')
    }
    const onComplete = (e)=>{
        setShowDisplay('Home')
        setPurchaseCompleted(false)
        setShowModal(false)
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
        <>
        {
            !purchaseCompleted ? 
        <div className='send-form-div'>
              <h1 className='transfer-h1'>Transfer</h1>
              <form className='send-form' onSubmit={onSubmit}>
                 <input
                 className='coin-send-input'
                    type="number"
                    name="coinAmt"
                    onChange={updateAmount}
                    value={coinAmt}
                ></input>
                <label className='to-label'>To:</label>
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
                <button className='form-buy-button' type="submit">Transfer {coinSymbol}</button>
            </form>
        </div> :
                <div classname='form-div'>
                {errors ?    errors.map(error => (
                                <>
                                    <p className='errors'>Errors</p>
                                    <p classnam='errors' key={error}>{error}</p>
                                </>
                        )):<>
                        <div classname='completed-div' style={{backgroundColor:"white", borderRadius: '5px', width: '300px', padding:'10px' }}>
                            <p style={{fontFamily: "'Roboto', sans-serif", marginLeft:'30px' }}>Your Transfer Was Successful!</p>
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
