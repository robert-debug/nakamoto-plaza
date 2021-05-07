import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getCoins } from '../../store/session';

const SignUpForm = () =>{
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coin)
    const sessionId = useSelector(state => state.session.user.id)
    const [ purchase, setpurchase ] = useState(true);
    const [coinAmt, setCoinAmt ] = useState(0);
    

}
