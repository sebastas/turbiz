import * as React from 'react';
import { Component } from 'react-simplified';

import createHashHistory from 'history/createHashHistory';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import { Column, Row, Button } from './widgets';
const history = createHashHistory();

export class OrderOverview extends Component {

  orders = [];

  render() {
    return(
      <div>
        <Topnav/>
        <br/>
        <Row>
          <Column>
            <h3>Bestillingsoversikt</h3>
          </Column>
          <Column width={2}>
            <Button.Success onClick={this.new}>Ny bestilling</Button.Success>
          </Column>
          <Column right>
            <input id="myInput" type="text" placeholder="Search.." onChange={event => this.search(event)}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th>Bestilling ID</th>
                <th>Kunde epost</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Behandler</th>
                <th>Levert</th>
              </tr>
              </thead>
              <tbody id="myTable">
              {this.orders.map(order => (
                <tr key={order.bestilling_id} id={order.bestilling_id} onClick={event => this.redirect(event)} onMouseOver={this.select}>
                  <td>{order.bestilling_id}</td>
                  <td>{order.epost}</td>
                  <td>{order.fra.toString().substring(0, 15)}</td>
                  <td>{order.til.toString().substring(0, 15)}</td>
                  <td>{order.brukernavn}</td>
                  <td>{order.levert === 1 ? '✓' : '-'}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button.Success onClick={this.back}>Tilbake</Button.Success>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {
    orderService.getOrders(orders => {
      this.orders = orders;
    });
    localStorage.removeItem("customer");
    localStorage.removeItem("equipment");
    localStorage.removeItem("time");
  }

  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  redirect(event) {
    let index = event.target.parentNode.id;
    history.push("/order/overview/" + index);
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }

  select() {
    let root = document.getElementById('root');
    root.style.cursor = 'pointer';
  }

  new() {
    history.push("/order/new/customer")
  }

  back(){
    history.push("/home")
  }
}
