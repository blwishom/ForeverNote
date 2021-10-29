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
import image from './components/images/notes-taking-img.jpg';
import { NavLink } from 'react-router-dom';

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
        <Route path='/notebooks/:notebookId/edit' exact={true}>
          <EditNotebookForm />
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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
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
            <h1>WELCOME TO FOREVER NOTE!</h1>
            <h2></h2>
          <div className="home-text-links1">
          <NavLink className="home-text-links1" to='/notes/new' exact={true} activeClassName='active'>
            create a new note
          </NavLink>
          </div>
          <div className="home-text-links2">
          <NavLink className="home-text-links2" to='/notebooks/new' exact={true} activeClassName='active'>
            create a new notebook
          </NavLink>
          </div>
          </div>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
