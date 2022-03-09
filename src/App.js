/* eslint-disable jsx-a11y/iframe-has-title */
import "./App.css";
import Wordle from "./pages/Wordle/Wordle";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import WordleGameContainer from "./pages/WordleGameContainer/WordleGameContainer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact component={Wordle} path="/wordle" />
          <Route exact component={WordleGameContainer} path="/wordle/game" />
          <div className="auth_container">
            <div className="forms">
              <Route exact component={Login} path='/login' />
              <Route exact component={Signup} path='/signup' />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
