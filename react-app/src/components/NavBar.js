
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import NoteForm from './NoteForm';
import { useSelector } from 'react-redux';
import SearchNotes from './SearchBar';
import { FaHome } from "react-icons/fa";
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user);

  if (!user) {
    return (
      <>
      <div className="login-signup-div">
        <div className="login-div">
          <NavLink to='/login' exact={true}>
          Login
          </NavLink>
        </div>
        <div className="signup-div">
          <NavLink to='/sign-up' exact={true}>
            Sign Up
          </NavLink>
        </div>
      </div>
      </>
    )
  } else {

    return (
      <nav className="navbar">
        <ul className="navbar-ul">
          <div>
            <SearchNotes />
          </div>

          <div>
          <NavLink className="text-decoration" to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <div>
          <NavLink className="text-decoration" to='/notes/new' exact={true} activeClassName='active'>
            + Note
          </NavLink>
          </div>

          <div>
          <NavLink className="text-decoration" to='/notebooks/new' exact={true} activeClassName='active'>
            + Notebook
          </NavLink>
          </div>

            <div>
            <NavLink className="text-decoration" to='/notes' exact={true} activeClassName='active'>
              Notes
            </NavLink>
            </div>

            <div>
            <NavLink className="text-decoration" to='/notebooks' exact={true} activeClassName='active'>
              Notebooks
            </NavLink>
            </div>
          </div>


            <LogoutButton className="logout-btn"/>

        </ul>
      </nav>
    );
  }


}

export default NavBar;
