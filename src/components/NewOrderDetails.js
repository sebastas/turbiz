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

  mounted() {
    let customer = JSON.parse(localStorage.getItem("customer"));
    let equipment = JSON.parse(localStorage.getItem("equipment"));
    let time = JSON.parse(localStorage.getItem("time"));
    console.log(customer);
    console.log(equipment);
    console.log(time);
  }
}