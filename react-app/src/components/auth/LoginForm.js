import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { login, demoLogin } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };
  
  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='form-div'>
      <form onSubmit={onLogin} className='form'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
          <button type="submit" onClick={demoLogin}>Demo User</button>
        </div>
      </form>
      <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Need an Account? Sign Up
          </NavLink>
          <a className='nomics-link' target="_blank" href="https://nomics.com">{'Crypto Market Cap & Pricing Data Provided By Nomics'}</a>
      </div>
    </div>
  );
};

export default LoginForm;
