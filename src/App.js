/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense, useEffect } from 'react'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import "./App.css";

const Wordle = lazy(() => import('./pages/Wordle/Wordle'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const WordleGameContainer = lazy(() => import('./pages/WordleGameContainer/WordleGameContainer'));
const ComingSoon = lazy(() => import('./components/CommingSoon'));
import Loader from "react-js-loader";
import Scan from './components/Scan';

function App() {

  const session = localStorage.getItem("session")
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    if (session !== null) {
      const loginTime = new Date(JSON.parse(session)).getTime()
      const now = new Date(Date.now()).getTime()
      const isExpired = now - loginTime
      if (isExpired > 1000 * 60 * 60 * 1) logout()
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
          <Redirect to="/rendle" from="/" />
          <Route exact component={Wordle} path="/rendle" />
          <Route exact component={WordleGameContainer} path="/rendle/game" />
          <Route exact component={Scan} path="/rendle-hunt" />
          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />
          {/* <Route exact component={ComingSoon} path='/sc' /> */}
          <Route exact component={ComingSoon} path='/raffle' />
        </Router>
      </Suspense>
    </div >
  );
}

export default App;
