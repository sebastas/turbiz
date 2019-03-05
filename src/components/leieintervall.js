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
        <Topnav />
        <div class="btn-group">
          <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Velg sted </button>
        <div class="dropdown-menu">
          <a class="dropdown-item">Rallarvegen</a>
          <a class="dropdown-item" href="#">Sted 2</a>
          <a class="dropdown-item" href="#">Sted 3 </a>
          </div>
          </div>
          <button type="button" id="back" onClick={this.hjem}>Tilbake</button>
        </div>
    )
  }
  hjem() {
    history.push("/home");
  }
}
