/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense, useEffect } from 'react'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import RendleGame from './pages/rendle/game/RendleGame'

import "./App.css";

const Rendle = lazy(() => import('./pages/rendle/Rendle'));
import { RendleLobby } from './pages/rendle/RendleLobby'

const RenderScan = lazy(() => import("./pages/renderscan/RenderScan"))
const RenderScanGame = lazy(() => import("./pages/renderscan/RenderScanGame"))
import { RenderScanLobby } from './pages/renderscan/RenderScanLobby'



const Signup = lazy(() => import('./pages/auth/Signup'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ChangePassword = lazy(() => import('./pages/auth/ChangePassword'));
const EmailVerification = lazy(() => import('./pages/auth/EmailVerification'));

const Raffle = lazy(() => import('./pages/raffle/Raffle'));
const HangMan = lazy(() => import('./pages/hangman/HangMan'));


import Loader from "react-js-loader";


const App = () => {

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {


    const session = localStorage.getItem("session")
    if (session !== null) {
      // const loginTime = new Date(JSON.parse(session)).getTime()
      // const now = new Date().getTime()
      // const isExpired = now - loginTime
      // console.log(isExpired)
      // if (isExpired > 1000 * 60 * 60 * 24) logout()
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

          <Route exact component={Rendle} path="/" />
          <Route exact component={RendleGame} path="/game/:contestId" />
          <Route exact component={RendleLobby} path="/lobby/:contestId" />

          <Route exact component={RenderScan} path="/renderscan" />
          <Route exact component={RenderScanGame} path="/renderscan/game" />
          <Route exact component={RenderScanLobby} path="/renderscan/lobby" />

          <Route exact component={HangMan} path="/hangman" />

          <Route exact component={Login} path='/login' />
          <Route exact component={ForgotPassword} path='/forgot-password/' />
          <Route exact component={ChangePassword} path='/change-password/:token' />
          <Route exact component={EmailVerification} path='/verify/:token' />
          <Route exact component={Signup} path='/signup' />


          <Route exact component={Raffle} path='/raffle' />
        </Router>
      </Suspense>
    </div >
  );
}

export default App;
