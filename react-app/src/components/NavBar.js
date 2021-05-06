import React, {useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const displayState = useSelector(state => state.display.display);
  const [title, setTitle] = useState(null)
  const dispatch = useDispatch()
  // const selectedCoin = useSelector(state => state.coin.coin);
  const history = useHistory();
  const home = (
    <>
    <h2>Home</h2>
    </>
  )

  const prices = (
    <>
    <h2>Prices</h2>
    </>
  )

  const portfolio = (
    <>
    <h2>Portfolio</h2>
    </>
  )

  const coinName = (
    <>
    <h2>selectedCoin.coinName</h2>
    </>
  )
  
  useEffect(() =>{
    if(!sessionUser) setTitle(null);
    if(sessionUser && displayState === 'home') setTitle(home);
    if(sessionUser && displayState === 'prices') setTitle(prices);
    if(sessionUser && displayState === 'portfolio') setTitle(portfolio);
    // if(sessionUser && displayState === 'coin') setTitle(coinName);
  },[dispatch, sessionUser])




  const onClick = (e) =>{
    history.push('/')
  }
  return (
      <div className='navbar'>
        <div className='logo-div' onClick={onClick}>
          <img className='logo' alt='logo' src={logo}/>
        </div>
        <div className='location-label'>
          {title}
        </div>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
  );
}

export default NavBar;
