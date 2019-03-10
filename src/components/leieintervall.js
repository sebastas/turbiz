import * as React from 'react';
import { Component } from 'react-simplified';
import createHashHistory from 'history/createHashHistory';
import { account } from './Login';
import {Topnav} from "./Topnav";
const history = createHashHistory();

export class Ordertime extends Component {

  render(){
    return(
      <div>
      <div>
        <Topnav />
        <select name="place">
          <option value="Sted1">Rallarvegen</option>
          <option value="Sted2">sted 2</option>
          <option value="Sted3">sted 3</option>
        </select>
      </div>
      <div>
        <button type="button" id="back" className="btn btn-primary btn-mg" onClick={this.hjem}>Tilbake</button>
      </div>
    </div>
    )
  }
  hjem() {
    history.push("/home");
  }
}
