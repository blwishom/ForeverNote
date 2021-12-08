import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = (e) => {
    setEmail("demo@aa.io");
    setPassword("password");
    e.preventDefault();

    return dispatch(login(email, password))
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <form className="login-form" onSubmit={onLogin}>
      <div className='login-form-div'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
      <h2 className="signup-form-h1">Login To Write Notes</h2>
        <label htmlFor='email'>Email </label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password </label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button className="login-btn" type='submit'>Login</button>
        <button className="login-btn" type="submit" onClick={demoUser}>Demo User</button>
    </form>

    <div className='below-login-div'>
      <NavLink to='/sign-up' exact={true}>
        <button className="sign-up-btn">If you are not a user yet, click here to learn more about Forevernote!</button>
      </NavLink>
    </div>
  </>
  );
};

export default LoginForm;
