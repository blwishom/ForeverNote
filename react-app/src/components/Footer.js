
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import NoteForm from './NoteForm';
import { useSelector } from 'react-redux';
import SearchNotes from './SearchBar';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import './Footer.css'

const Footer = () => {

  const user = useSelector((state) => state.session.user);

  if (user) {
    return (
        <>
        <div className="footer-div">
          <div className="github-div">
            <a className="text-decoration"  href='https://github.com/blwishom' exact={true}>
            <FaGithub /> GitHub
            </a>
          </div>
          <div className="linkedin-div">
            <a className="text-decoration" href='https://www.linkedin.com/in/blair-wishom-10a204b3/' exact={true}>
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
        </>
      )
  }
  return ''
  }


export default Footer;
