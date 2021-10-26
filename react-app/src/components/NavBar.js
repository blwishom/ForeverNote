
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import NoteForm from './NoteForm';
import SearchNotes from './SearchBar'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <div>
          <SearchNotes />
        </div>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/notes' exact={true} activeClassName='active'>
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink to='/notes/new' exact={true} activeClassName='active'>
            Create Notes
          </NavLink>
        </li>
        <li>
          <NavLink to='/notebooks' exact={true} activeClassName='active'>
            Notebooks
          </NavLink>
        </li>
        <li>
          <NavLink to='/notebooks/new' exact={true} activeClassName='active'>
            Create Notebooks
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
