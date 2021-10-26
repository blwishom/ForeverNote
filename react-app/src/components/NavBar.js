
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
<<<<<<< HEAD
=======
import NoteForm from './NoteForm';
import SearchNotes from './SearchBar'
>>>>>>> 73e39dcd8fc58a9efb6ba0ba5e8db2ee4ce9f5e3
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
<<<<<<< HEAD
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/notes' exact={true} activeClassName='active'>
            Notes
          </NavLink>

    
          <NavLink to='/notes/new' exact={true} activeClassName='active'>
            Create Notes
          </NavLink>
      
    
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
      
=======
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
>>>>>>> 73e39dcd8fc58a9efb6ba0ba5e8db2ee4ce9f5e3
      </ul>
    </nav>
  );
}

export default NavBar;
