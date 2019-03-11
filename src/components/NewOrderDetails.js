import * as React from 'react';
import { Component } from 'react-simplified';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import { Card, Column, List, Row, Button } from './widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class NewOrderDetails extends Component {

  render() {
    return(
      <div>
        <Topnav/>
        details
      </div>
    )
  }
}