import React, {useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const displayState = useSelector(state => state.session.user);
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
  
  let displayHeader;
  use
  if(!sessionUser) displayHeader = null;
  if(sessionUser && displayState === 'home') displayHeader = home
  if(sessionUser && displayState === 'prices') displayHeader = prices
  if(sessionUser && displayState === 'portfolio') displayHeader = portfolio
  // if(sessionUser && displayState === 'coin') displayHeader = coinName




  const onClick = (e) =>{
    history.push('/')
  }
  return (
      <div className='navbar'>
        <div className='logo-div' onClick={onClick}>
          <img className='logo' alt='logo' src={logo}/>
        </div>
        <div className='location-label'>
          {displayHeader}
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
