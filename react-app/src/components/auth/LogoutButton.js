import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './auth.css';

const LogoutButton = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  if (!user) {
    return <Redirect to='/' />;
  }

  return <button className="logout-btn" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
