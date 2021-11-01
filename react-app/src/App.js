import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NoteForm from './components/NoteForm';
import NotebookForm from './components/NotebookForm.js';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import NotePage from './components/NotePage';
import NotebookPage from './components/NotebookPage';
import EditForm from './components/EditForm';
import EditNotebookForm from './components/NotebookPage/edit_notebook_form';
import './index.css';
import image from './components/images/coffee-and-notes.jpg';
import { NavLink } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/notes/new' exact={true}>
          <NoteForm />
        </Route>
        <Route path='/notes/:noteId/edit' exact={true}>
          <EditForm />
        </Route>
        <Route path='/notes' exact={true}>
          <NotePage />
        </Route>
        <Route path='/notebooks/new' exact={true}>
          <NotebookForm />
        </Route>
        <Route path='/notebooks' exact={true}>
          <NotebookPage />
        </Route>
        <Route path='/login' className="login" exact={true}>
          <h1 className="h1-div">Login Below To Write Notes</h1>
          <LoginForm />
        {/* <div className="logged-out-img" style={{backgroundImage: `url(${image})`}}>
        </div> */}
        </Route>
        <Route path='/sign-up' className="sign-up" exact={true}>
        <h1 className="h1-div">Sign Up Below To Write Notes</h1>
          <SignUpForm />
          <h2 className="h2-div">Forever Note is here to help you:</h2>
          <h3 className="h2-div">- remember important tasks/information!</h3>
          <h3 className="h2-div">- keep information organized!</h3>
          <h3 className="h2-div">- release your thoughts!</h3>

        {/* <div className="logged-out-img" style={{backgroundImage: `url(${image})`}}>
        </div> */}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <div className="home-img" style={{backgroundImage: `url(${image})`}}>
          </div>
          <div className="home-text">
            <h1 className="welcome-div">WELCOME TO FOREVER NOTE!</h1>

          <NavLink className="home-text-links1" to='/notes/new' exact={true} activeClassName='active'>
            create a new note
          </NavLink>

          <NavLink className="home-text-links2" to='/notebooks/new' exact={true} activeClassName='active'>
            create a new notebook
          </NavLink>

          </div>
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
