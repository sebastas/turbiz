import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import {Topnav} from "./Topnav";

import createHashHistory from 'history/createHashHistory';
import {orderService} from "../services/order-service";
import {userService} from "../services/user-service";
const history = createHashHistory();

export class OrderDetails extends Component {

  order = {};

  render() {
    return(
      <div>
        <Topnav/>
        <div className="card">
          <div className="card-body">
            <span><span>Bestilling id: </span>{this.order.id}</span><br/>
            <span><span>Fra dato: </span>{this.order.from}</span><br/>
            <span><span>Til dato: </span>{this.order.to}</span><br/>
            <span><span>Behandler: </span>{this.order.processor}</span><br/>
          </div>
        </div>
      </div>
    )
  }

  mounted() {
    orderService.getOrder(this.props.match.params.id, order => {
      this.order.id = order.bestilling_id;
      this.order.from = order.fra.toString().substring(0, 15);
      this.order.to = order.til.toString().substring(0, 15);
      this.order.hours = order.timer;
      this.order.processor = order.brukernavn;
    });
  }
}