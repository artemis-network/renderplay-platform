/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import "./App.css";
import Footer from './components/wordle/Footer/Footer'

const Wordle = lazy(() => import('./pages/Wordle/Wordle'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const WordleGameContainer = lazy(() => import('./pages/WordleGameContainer/WordleGameContainer'));
const ComingSoon = lazy(() => import('./components/CommingSoon'));
const Loader = () => <div>Loader</div>

function App() {
  return (
    <div>
      <Suspense fallback={Loader}>

        <Router>
          <Route exact component={Wordle} path="/" />
          <Route exact component={Wordle} path="/rendle" />
          <Route exact component={WordleGameContainer} path="/rendle/game" />
          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />
          <Route exact component={ComingSoon} path='/sc' />
          <Route exact component={ComingSoon} path='/lottery' />
        </Router>
        <Footer />
      </Suspense>
    </div >
  );
}

export default App;
