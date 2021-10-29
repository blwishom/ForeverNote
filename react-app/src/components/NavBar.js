
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
          + New Notebook
        </NavLink>
        </div>

          </div>

          <div>
          <NavLink className="text-decoration" to='/notes' exact={true} activeClassName='active'>
            Notes
          </NavLink>
          </div>


          <NavLink className="text-decoration" to='/notebooks' exact={true} activeClassName='active'>
            Notebooks
          </NavLink>


          <NavLink className="text-decoration" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>


          <NavLink className="text-decoration" to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>


          <NavLink className="text-decoration" to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>


          <LogoutButton />

      </ul>
    </nav>
  );
}

export default NavBar;
