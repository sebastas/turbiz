import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Navbar } from './Navbar';

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
        <Navbar />
        <h1>Home</h1>
      </div>
    )
  }
}