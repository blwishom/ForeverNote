
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
        <ul>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/notes' exact={true} activeClassName='active'>
            Notes
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/notes/new' exact={true} activeClassName='active'>
            Create Notes
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/notebooks' exact={true} activeClassName='active'>
            Notebooks
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/notebooks/new' exact={true} activeClassName='active'>
            Create Notebooks
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </ul>
        <ul>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </ul>
        <ul>
          <LogoutButton />
        </ul>
      </ul>
    </nav>
  );
}

export default NavBar;
