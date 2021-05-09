import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { DisplayStateContext } from '../context/Display'
import BuySellFormModal from '../components/BuySellFormModal/index'
import { requestCoins } from '../store/coins'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState(null)
  const dispatch = useDispatch()
  const { showDisplay, setShowDisplay} = useContext(DisplayStateContext)
  // const selectedCoin = useSelector(state => state.coin.coin);
  const history = useHistory();
  const display = (
    <>
    <h2>{showDisplay}</h2>
    </>
  )
  useEffect(()=>{
    dispatch(requestCoins())
  },[dispatch])
  
  useEffect(() =>{
    if(!sessionUser) setTitle(null);
    if(sessionUser && showDisplay === !'coin') setTitle(showDisplay);
    // if(sessionUser && displayState === 'coin') setTitle(coinName);
  },[])




  const onClick = (e) =>{
    setShowDisplay('Home')
    setTitle(showDisplay)
    history.push('/')
  }
  return (
      <div className='navbar'>
        <div className='logo-div' onClick={onClick}>
          <img className='logo' alt='logo' src={logo}/>
        </div>
        <div className='location-label'>
          {display}
        </div>
        <div>
          { sessionUser ? <BuySellFormModal props={{coin: 'BTC'}}/>: null}
        </div>
        <div>
          { sessionUser ? null : null }
        </div>
        <div>
          { sessionUser ? <LogoutButton />: null }
        </div>
      </div>
  );
}

export default NavBar;
