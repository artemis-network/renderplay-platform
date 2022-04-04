/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense, useEffect } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import "./App.css";

const Wordle = lazy(() => import('./pages/Wordle/Wordle'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const WordleGameContainer = lazy(() => import('./pages/WordleGameContainer/WordleGameContainer'));
const ComingSoon = lazy(() => import('./components/CommingSoon'));
import Loader from "react-js-loader";

function App() {

  const session = localStorage.getItem("session")

  const logout = () => {
    localStorage.clear()
  }

  useEffect(() => {
    if (session !== null || session !== undefined) {
      const loginTime = new Date(JSON.parse(session)).getTime()
      const now = new Date(Date.now()).getTime()
      const isExpired = loginTime - now
      if (isExpired > 1000 * 60 * 5) logout()
    }
  }, [])

  return (
    <div>
      <Suspense fallback={
        <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "#321e43" }}>
          <Loader type="bubble-scale" bgColor={"#F3CCD0"} color={"#F3CCD0"} title={"Loading..."} size={100} />
        </div>
      }>
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
