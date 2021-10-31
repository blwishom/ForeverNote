
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import NoteForm from './NoteForm';
import { useSelector } from 'react-redux';
import SearchNotes from './SearchBar';
import './Footer.css'

const Footer = () => {

  const user = useSelector((state) => state.session.user);


    return (
        <>
        <div className="footer-div">
          <div className="login-div">
            <a className="text-decoration"  href='https://github.com/blwishom' exact={true}>
            GitHub
            </a>
          </div>
          <div className="signup-div">
            <a className="text-decoration" href='https://www.linkedin.com/in/blair-wishom-10a204b3/' exact={true}>
              LinkedIn
            </a>
          </div>
        </div>
        </>
      )
  }


export default Footer;
