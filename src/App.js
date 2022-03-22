/* eslint-disable jsx-a11y/iframe-has-title */
import "./App.css";
import Wordle from "./pages/Wordle/Wordle";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import WordleGameContainer from "./pages/WordleGameContainer/WordleGameContainer";
import Footer from './components/wordle/Footer/Footer'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact component={Wordle} path="/" />
          <Route exact component={Wordle} path="/wordle" />
          <Route exact component={WordleGameContainer} path="/wordle/game" />
          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
