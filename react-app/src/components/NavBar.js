import React, {useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from '../image-assets/color_logo_with_background.png'
import { DisplayStateContext } from '../context/Display'

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
          { sessionUser ? <LogoutButton /> : null}
        </div>
      </div>
  );
}

export default NavBar;
