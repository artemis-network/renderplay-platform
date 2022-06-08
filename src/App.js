/* eslint-disable jsx-a11y/iframe-has-title */
import { lazy, Suspense, useEffect } from 'react'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import "./App.css";

const Rendle = lazy(() => import('./pages/rendle/Rendle'));
const RendleGame = lazy(() => import('./pages/rendle/game/RendleGame'));
import { RendleLobby } from './pages/rendle/RendleLobby'

const RenderScan = lazy(() => import("./pages/renderscan/RenderScan"))
const RenderScanGame = lazy(() => import("./pages/renderscan/RenderScanGame"))
import { RenderScanLobby } from './pages/renderscan/RenderScanLobby'


const Signup = lazy(() => import('./pages/auth/Signup'));
const Login = lazy(() => import('./pages/auth/Login'));

const Raffle = lazy(() => import('./pages/raffle/Raffle'));
const HangMan = lazy(() => import('./pages/hangman/HangMan'));


import Loader from "react-js-loader";


import { gsap, ScrollTrigger } from "gsap/all";

const App = () => {

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".contest_game_card");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".contest_scroll",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        invalidateOnRefresh: true,
      },
    });
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
          <Route exact component={RendleGame} path="/game" />
          <Route exact component={RendleLobby} path="/lobby" />

          <Route exact component={RenderScan} path="/renderscan" />
          <Route exact component={RenderScanGame} path="/renderscan/game" />
          <Route exact component={RenderScanLobby} path="/renderscan/lobby" />

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
