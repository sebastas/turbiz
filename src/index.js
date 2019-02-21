import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



class Login extends Component {

  render() {
    return(
        <div>
          <div className="wrapper fadeInDown">
            <div id="formContent">

              <div className="fadeIn first">
                <img src="../logo.png" id="icon" alt="User Icon"/>
                <h3>TurBiz Portal</h3>
                <h5>AS Sykkelutleie</h5>
              </div>

              <form>
                <input type="text" id="login" className="fadeIn second" name="login" placeholder="Brukernavn" />
                <input type="password" id="password" className="fadeIn third" name="login" placeholder="Passord" />
                <input type="submit" className="fadeIn fourth" value="Logg inn" onClick={this.validate}/>
              </form>
            </div>
          </div>
        </div>
    )
  }

  validate() {
    history.push("/home");
  }
}

class Home extends Component {

  render() {
    return(
        <div>
          <h1>Home</h1>
        </div>
    )
  }
}

ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/home"} component={Home} />
      </div>
    </HashRouter>,
  document.getElementById('root')
);
