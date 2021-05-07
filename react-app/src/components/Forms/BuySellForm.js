import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getCoins } from '../../store/session';

const BuySellForm = () =>{
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin)
    const coins = useSelector
    const sessionId = useSelector(state => state.session.user.id)
    const [purchase, setpurchase] = useState(true);
    const [coinAmt, setCoinAmt] = useState(0);
    const [fiatPrice, setFiatPrice] = useState(0);
    const price = useSelector(state => state.coin.coin.price)
    const fiatId = 1;
    const [coinId, setCoinId] = useState(0);
    if (coinId === 0) setCoinId
    const onSubmit = (e)=>{

    }

    return(
        <div>
            <div>Buy</div><div>Sell</div>
            <form onSubmit={onSubmit}>
                

            </form>
        </div>
    )

}
