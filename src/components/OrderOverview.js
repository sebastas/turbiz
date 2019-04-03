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
    // Gets all orders in the db
    orderService.getOrders(orders => {
      this.orders = orders;
    });
    // Removes any customer-, equipment- and time-info for any orders previously added that might have existed
    localStorage.removeItem("customer");
    localStorage.removeItem("equipment");
    localStorage.removeItem("time");
  }

  /**
   * Search for specific parameters in the table, ex. customer email, employee processor, date
   * @param event Changes on input
   */
  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  /**
   * Gets orderId on table row click and redirects to more detailed info about the order
   * @param event Click on table row
   */
  redirect(event) {
    let index = event.target.parentNode.id;
    history.push("/order/overview/" + index);
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }

  /**
   * Changes cursor to pointer when mouse hovers the table
   */
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
