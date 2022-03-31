/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import "./App.css";

const Wordle = lazy(() => import('./pages/Wordle/Wordle'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const WordleGameContainer = lazy(() => import('./pages/WordleGameContainer/WordleGameContainer'));
const ComingSoon = lazy(() => import('./components/CommingSoon'));


function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Redirect from="/" to="/rendle"></Redirect>
          <Route exact component={Wordle} path="/rendle" />
          <Route exact component={WordleGameContainer} path="/rendle/game" />
          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />
          <Route exact component={ComingSoon} path='/sc' />
          <Route exact component={ComingSoon} path='/lottery' />
        </Router>
      </Suspense>
    </div >
  );
}

export default App;
