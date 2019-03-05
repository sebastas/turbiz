import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';
import { Status } from './Status';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Home extends Component {

  mounted() {
    if (account === "") {
      history.push("/");
    }
  }

  render() {
    return(
      <div>
        <Topnav />
        <h1>Home</h1>
        <button type="button" className="btn btn-outline-primary btn-rounded waves-effect" onClick={this.Status}>Status</button>
      </div>
    )
  }

  Status() {
    history.push("/Status")
  }
}
