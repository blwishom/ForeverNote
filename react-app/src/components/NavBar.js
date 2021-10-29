
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
          <NavLink to='/notes/new' exact={true} activeClassName='active'>
           + New
          </NavLink>
          <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          </div>

          <div>
          <NavLink to='/notes' exact={true} activeClassName='active'>
            Notes
          </NavLink>
          </div>





          <NavLink to='/notebooks' exact={true} activeClassName='active'>
            Notebooks
          </NavLink>


          <NavLink to='/notebooks/new' exact={true} activeClassName='active'>
            Create Notebooks
          </NavLink>


          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>


          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>


          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>


          <LogoutButton />

      </ul>
    </nav>
  );
}

export default NavBar;
