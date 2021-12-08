import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import image2 from '../images/notebook-with-notes.jpg'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else if (username && email && password !== repeatPassword) {
      setErrors(['*PASSWORDS DO NOT MATCH*'])
    }
  };

  const demoUser = (e) => {
    setEmail("demo@aa.io");
    setPassword("password");
    e.preventDefault();

    return dispatch(login(email, password))
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
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
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='above-form-div'>
      <h1>Organize your life with Forevernote</h1>
      <h2>Remember your tasks, projects, assignments, and more all in one place!</h2>
    </div>
      <div>
    <form className="signup-form" onSubmit={onSignUp}>
      <div className='sign-up-form-content-divs'>
      <h2 className="signup-form-h1">Sign Up To Write Notes</h2>
        <label>User Name </label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='sign-up-form-content-divs'>
        <label>Email </label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='sign-up-form-content-divs'>
        <label>Password </label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='sign-up-form-content-divs'>
        <label>Repeat Password </label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="signup-btn" type='submit'>Sign Up</button>
      {/* <button className="signup-btn" type="submit" onClick={demoUser}>Demo User</button> */}
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    </form>
    </div>
      <div className="sign-up-img" style={{backgroundImage: `url(${image2})`}}>
      </div>
    </>
  );
};

export default SignUpForm;
