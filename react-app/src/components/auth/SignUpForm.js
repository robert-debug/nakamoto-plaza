import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../image-assets/color_logo_with_background.png'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fakeBankInfo, setFakeBankInfo] = useState("");
  const [usState, setUSState] = useState("");
  const [errors, setErrors] = useState([]);

  const statesArray = 
  ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let data = await dispatch(signUp(username, email, password, firstName, lastName, fakeBankInfo, usState));
      console.log(data)
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUSState = (e) => {
    setUSState(e.target.value);
  };

  const updateFakeBankInfo = (e) => {
    setFakeBankInfo(e.target.value);
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div modal='signup-form-div'>
        <div className='signup-logo-div'>
          <img className='signup-form-logo' alt='logo' src={logo}/>
        </div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
      <form onSubmit={onSignUp} className='signup-form'>
        <div className= 'signup-interior-div'>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label>Password</label>
          <input
           type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
       <div className= 'signup-interior-div'>
         <label>Last Name</label>
         <input
           type="text"
           name="lastname"
           onChange={updateLastName}
           value={lastName}
         ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label>Fake (Fake!) Bank Number</label>
          <input
            type="number"
            name="fakebankinfo"
            onChange={updateFakeBankInfo}
            value={fakeBankInfo}
          ></input>
        </div>
        <div className= 'signup-interior-div'>
          <label className='state-label'>
            State
          </label>
          <select className='auth-select' value={usState} onChange={updateUSState}>
            {
              statesArray.map(state => (
                <option key={state} value={state}>{state}</option>
              ))
            }
          </select>
        </div>            
        <button className='buy-button' type="submit">Sign Up</button>
      </form>
      <div className='switch-nomics'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Already have a Nakamoto Plaza Account? Log in
          </NavLink>
        </div>
          <a className='nomics-link' target="_blank" href="https://nomics.com">{'Crypto Market Cap & Pricing Data Provided By Nomics'}</a>
    </div>
  );
};

export default SignUpForm;
