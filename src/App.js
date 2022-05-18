/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense, useEffect } from 'react'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import "./App.css";

const Rendle = lazy(() => import('./pages/rendle/Rendle'));
const RendleGame = lazy(() => import('./pages/rendle/game/RendleGame'));

const RenderScan = lazy(() => import("./pages/renderscan/RenderScan"))
const RenderScanGame = lazy(() => import("./pages/renderscan/RenderScanGame"))

const Signup = lazy(() => import('./pages/auth/Signup'));
const Login = lazy(() => import('./pages/auth/Login'));

const Raffle = lazy(() => import('./pages/raffle/Raffle'));
const HangMan = lazy(() => import('./pages/hangman/HangMan'));

import Loader from "react-js-loader";

const App = () => {

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
      if (isExpired > 1000 * 60 * 60 * 24) logout()
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

          <Route exact component={Rendle} path="/rendle" />
          <Route exact component={RendleGame} path="/rendle/game" />

          <Route exact component={RenderScan} path="/renderscan" />
          <Route exact component={RenderScanGame} path="/renderscan/game" />

          <Route exact component={HangMan} path="/hangman" />

          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />

          <Route exact component={Raffle} path='/raffle' />
        </Router>
      </Suspense>
    </div >
  );
}

export default App;
