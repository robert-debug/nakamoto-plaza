import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { DisplayStateContext } from '../context/Display'
import BuySellFormModal from '../components/BuySellFormModal/index'
import { requestCoins } from '../store/coins'
import TransferModal from '../components/TransferModal/index'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const selectedCoin = useSelector(state => state.coin.coin);
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
  
  const coinName =(
    <>
    <h2>{selectedCoin?.name}</h2>
    </>
  )

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
        <div className='logo-loc-container'>
          <div className='logo-div' onClick={onClick}>
            <img className='logo' alt='logo' src={logo}/>
          </div>
          {
            sessionUser ?
            <div className='location-label'>
              { showDisplay == 'coin' && selectedCoin ? coinName : display }
            </div> : null
          }
        </div>
        <div className='button-icon-container'>
            <div >
              { sessionUser ? <LogoutButton />: null }
            </div>
          <div>
            { sessionUser ? <TransferModal /> : null }
          </div>
          <div>
            { sessionUser ? <BuySellFormModal props={{coin: 'BTC'}}/>: null}
          </div>
          </div>
      </div>
  );
}

export default NavBar;
