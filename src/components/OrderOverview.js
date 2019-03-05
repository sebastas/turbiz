import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import {userService} from "../services/user-service";
const history = createHashHistory();

export class OrderOverview extends Component {

  orders = [];

  render() {
    return(
      <div>
        <Topnav/>
        <h3>Bestillingsoversikt</h3>
        <input id="myInput" type="text" placeholder="Search.." onChange={event => this.search(event)}/>
        <br/><br/>

        <table className="table table-striped">
          <thead>
          <tr>
            <th>Bestillings ID</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Behandler</th>
          </tr>
          </thead>
          <tbody id="myTable">
          {this.orders.map(order => (
            <tr key={order.bestilling_id} id={order.bestilling_id} onClick={event => this.redirect(event)}>
              <td>{order.bestilling_id}</td>
              <td>{order.fra.toString().substring(0, 15)}</td>
              <td>{order.til.toString().substring(0, 15)}</td>
              <td>{order.brukernavn}</td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    )
  }

  mounted() {
    orderService.getOrders(orders => {
      this.orders = orders;
      this.loaded = true;
    });
  }

  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  redirect(event) {
    let index = event.target.parentNode.id;
    history.push("/overview/" + index);
  }
}