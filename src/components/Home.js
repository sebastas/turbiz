import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';

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
      </div>
    )
  }
}