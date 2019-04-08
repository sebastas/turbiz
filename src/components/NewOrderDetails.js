import * as React from 'react';
import { Component } from 'react-simplified';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import { Card, Column, List, Row, Button } from './widgets';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import createHashHistory from 'history/createHashHistory';
import { userService } from '../services/user-service';
import { utstyrService } from '../services/utstyrService';
const history = createHashHistory();

export class NewOrderDetails extends Component {

  customer = {};
  equipment = {};
  time = {};
  bikes = [];
  equip = [];
  price = {};
  loyalMember = false;

  render() {
    return(
      <div className="gradient">
        <Topnav/>
        <Card id="order-details-card">
          <Row>
            <Column width={4}>
              <Button.Light onClick={this.redirectCustomer} id="redirect-customer">1. Kundeinfo</Button.Light>
            </Column>
            <Column width={4}>
              <Button.Light onClick={this.redirectEquipment} id="redirect-equipment">2. Utstyr</Button.Light>
            </Column>
            <Column width={4}>
              <Button.Light onClick={this.redirectTime} id="redirect-time">3. Dato</Button.Light>
            </Column>
          </Row>
          <Row>
            <Column>
              <h4 id="new-order-title">Legg til bestilling - oversikt</h4>
            </Column>
          </Row>
          <Row>
            <Column width={4}>
              <Card title="Generell info" id="new-order-info">
                <div id="dagsleie" style={{display: this.time.hours === "0" ? 'block' : 'none'}}>
                  <Row>
                    <Column width={5}>
                      Fra dato:
                    </Column>
                    <Column width={7}>
                      {this.time.from}
                    </Column>
                  </Row>
                  <Row>
                    <Column width={5}>
                      Til dato:
                    </Column>
                    <Column width={7}>
                      {this.time.to}
                    </Column>
                  </Row>
                  <Row>
                    <Column width={5}>
                      Antall dager:
                    </Column>
                    <Column width={7}>
                      {this.price.days}
                    </Column>
                  </Row>
                </div>
                <div id="timesleie" style={{display: this.time.hours !== "0" ? 'block' : 'none'}}>
                  <Row>
                    <Column width={5}>
                      Dato:
                    </Column>
                    <Column width={7}>
                      {this.time.from}
                    </Column>
                  </Row>
                  <Row>
                    <Column width={5}>
                      Antall timer:
                    </Column>
                    <Column width={7}>
                      {this.time.hours}
                    </Column>
                  </Row>
                </div>
                <br/>
                <Row>
                  <Column width={5}>
                    Kunde:
                  </Column>
                  <Column width={7}>
                    {this.customer.navn}
                  </Column>
                </Row>
                <Row>
                  <Column width={5}>
                    Epost:
                  </Column>
                  <Column width={7}>
                    {this.customer.epost}
                  </Column>
                </Row>
                <Row>
                  <Column width={5}>
                    Telefon:
                  </Column>
                  <Column width={7}>
                    {this.customer.telefon}
                  </Column>
                </Row>
                <div style={{color: 'green', display: this.loyalMember ? 'block' : 'none'}}>
                  <Row>
                    <Column width={5}>
                      Lojal kunde:
                    </Column>
                    <Column width={7}>
                      10% rabatt lagt til
                    </Column>
                  </Row>
                </div>
                <div style={{color: 'green', display: this.bikes.length >= 3 ? 'block' : 'none'}}>
                  <Row>
                    <Column width={5}>
                      Grupperabatt:
                    </Column>
                    <Column width={7}>
                      {this.loyalMember ?  this.price.discount - 10 : this.price.discount}% rabatt lagt til
                    </Column>
                  </Row>
                </div>
              </Card>
            </Column>
            <Column width={2}/>
            <Column width={5}>
              <Card title="Pris oversikt" id="new-order-price">
                <Row>
                  <Column>
                    Pris sykler
                  </Column>
                  <Column>
                    {this.price.bikes} kr
                  </Column>
                </Row>
                <Row>
                  <Column>
                    Pris utstyr
                  </Column>
                  <Column>
                    {this.price.equip} kr
                  </Column>
                </Row>
                <Row>
                  <Column>
                    Rabatt
                  </Column>
                  <Column>
                    - {this.price.discount} %
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <strong>Total</strong>
                  </Column>
                  <Column>
                    <strong>{this.price.total} kr</strong>
                  </Column>
                </Row>
              </Card>
            </Column>
          </Row>
          <Row>
            <Column width={12}>
              <Card title="Utstyr som skal leies" id="new-equipment-info">
                <Card title="Sykler">
                  <Row>
                    <Column>
                      <List.Item>
                        <Row>
                          <Column width={1}><strong>ID</strong></Column>
                          <Column width={2}><strong>Navn</strong></Column>
                          <Column width={2}><strong>Type</strong></Column>
                          <Column width={2}><strong>{this.time.hours === "0" ? 'Dagspris' : 'Timepris'}</strong></Column>
                          <Column width={2}><strong>Status</strong></Column>
                          <Column width={3}><strong>Beskrivelse</strong></Column>
                        </Row>
                      </List.Item>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <List>
                        {
                          this.bikes.map(bike => (
                            <List.Item key={bike.sykkel_id}>
                              <Row>
                                <Column width={1}>{bike.sykkel_id}</Column>
                                <Column width={2}>{bike.navn}</Column>
                                <Column width={2}>{bike.type}</Column>
                                <Column width={2}>{this.time.hours === "0" ? bike.ppd : bike.ppt}</Column>
                                <Column width={2}>{bike.status}</Column>
                                <Column width={3}>{bike.beskrivelse}</Column>
                              </Row>
                            </List.Item>
                          ))
                        }
                      </List>
                    </Column>
                  </Row>
                </Card>
                <Card title="Utstyr">
                  <Row>
                    <Column>
                      <List.Item>
                        <Row>
                          <Column width={1}><strong>ID</strong></Column>
                          <Column width={2}><strong>Navn</strong></Column>
                          <Column width={2}><strong>Type</strong></Column>
                          <Column width={2}><strong>Pris</strong></Column>
                          <Column width={2}><strong>Status</strong></Column>
                          <Column width={3}><strong>Beskrivelse</strong></Column>
                        </Row>
                      </List.Item>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <List>
                        { this.equip.map(equip => (
                          <List.Item key={equip.utstyr_id}>
                            <Row>
                              <Column width={1}>{equip.utstyr_id}</Column>
                              <Column width={2}>{equip.navn}</Column>
                              <Column width={2}>{equip.type}</Column>
                              <Column width={2}>{equip.pris}</Column>
                              <Column width={2}>{equip.status}</Column>
                              <Column width={3}>{equip.beskrivelse}</Column>
                            </Row>
                          </List.Item>
                        ))}
                      </List>
                    </Column>
                  </Row>
                </Card>
              </Card>
            </Column>
          </Row>
          <Row>
            <Column width={4}/>
            <Column width={4}>
              <Button.Success onClick={this.confirmOrder} id="confirm-order-button">Bekreft bestilling</Button.Success>
            </Column>
          </Row>
        </Card>
      </div>
    )
  }


  mounted() {
    this.bikes = [];
    this.equip = [];
    this.getImports();
    this.getBikes();
    this.getEquip();
    this.checkIfMember();
    setTimeout(this.calculatePrice, 500); // slight delay to ensure price is correct
  }

  /**
   * Imports from localStorage and has to create new Date objects of the simplified string-dates in 'time'
   */
  getImports() {
    let customer = JSON.parse(localStorage.getItem("customer"));
    let equipment = JSON.parse(localStorage.getItem("equipment"));
    let time = JSON.parse(localStorage.getItem("time"));
    let from = new Date(time.start);
    let to = new Date(time.end);
    this.customer = customer;
    this.equipment = equipment;
    this.time = {
      from: from.toString().substring(0, 15),
      to: to.toString().substring(0, 15),
      hours: time.hours
    };
  }

  /**
   * Gets any available bike matching location and type and limits on amount the customer wanted
   */
  getBikes() {
    orderService.getBikesForOrder(this.equipment.sted, "terreng", this.equipment.terreng, bikes => {
      for (let i = 0; i < bikes.length; i++) {
        this.bikes.push(bikes[i]);
      }
    });
    orderService.getBikesForOrder(this.equipment.sted, "downhill", parseInt(this.equipment.downhill), bikes => {
      for (let i = 0; i < bikes.length; i++) {
        this.bikes.push(bikes[i]);
      }
    });
    orderService.getBikesForOrder(this.equipment.sted, "racer", parseInt(this.equipment.racer), bikes => {
      for (let i = 0; i < bikes.length; i++) {
        this.bikes.push(bikes[i]);
      }
    });
    orderService.getBikesForOrder(this.equipment.sted, "barnesykkel", parseInt(this.equipment.barnesykkel), bikes => {
      for (let i = 0; i < bikes.length; i++) {
        this.bikes.push(bikes[i]);
      }
    });
    orderService.getBikesForOrder(this.equipment.sted, "hybrid", parseInt(this.equipment.hybrid), bikes => {
      for (let i = 0; i < bikes.length; i++) {
        this.bikes.push(bikes[i]);
      }
    });
  }

  /**
   * Gets any available equipment matching location and type and limits on amount the customer wanted
   */
  getEquip() {
    orderService.getEquipForOrder(this.equipment.sted, "hjelm", parseInt(this.equipment.hjelm), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "lås", parseInt(this.equipment.lås), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "beskytter", parseInt(this.equipment.beskytter), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "lappesaker", parseInt(this.equipment.lappesaker), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "sykkelveske", parseInt(this.equipment.sykkelveske), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "barnehenger", parseInt(this.equipment.barnehenger), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "lastehenger", parseInt(this.equipment.lastehenger), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
    orderService.getEquipForOrder(this.equipment.sted, "barnesete", parseInt(this.equipment.barnesete), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
  }

  // Redirects to other pages in the new order process
  redirectCustomer() {
    history.push("/order/new/customer");
  }
  redirectEquipment() {
    history.push("/order/new/equipment");
  }
  redirectTime() {
    history.push("/order/new/time");
  }

  /**
   * Checks if the customer-info (email) matches any existing customer. If true, makes sure to give a discount in
   * calculatePrice() below.
   */
  checkIfMember() {
    orderService.getCustomers(customers => {
      for (let customer of customers) {
        if (this.customer.epost === customer.epost) {
          this.loyalMember = true;
        }
      }
    });
  }

  /**
   * Calculates the price for the order.
   */
  calculatePrice() {
    this.price = {
      days: 0,
      bikes: 0,
      equip: 0,
      discount: 0,
      total: 0
    };
    let time = JSON.parse(localStorage.getItem("time"));
    let from = new Date(time.start);
    let to = new Date(time.end);
    this.price.days = differenceInCalendarDays(to, from); // Get number of days
    // Bike prices
    for (let bike of this.bikes) {
      if (this.time.hours === "0") {
        this.price.bikes += bike.ppd * this.price.days;
      } else {
        this.price.bikes += bike.ppt * this.time.hours;
      }
    }
    // Equipment prices
    for (let equip of this.equip) {
      if (this.time.hours === "0") {
        this.price.equip += equip.pris * this.price.days;
      } else {
        this.price.equip += equip.pris;
      }
    }

    this.price.total = this.price.bikes + this.price.equip;

    // Discounts
    if (this.loyalMember) {
      this.price.discount += 10;
    }

    if (this.bikes.length >= 3) {
      this.price.discount += 10; // 5% discount for 3+ bikes
      if (this.bikes.length >= 5) {
        this.price.discount += 5; // Another 3% off for 5+ bikes
      }
    }

    this.price.total = this.price.total * (1 - this.price.discount / 100);

  }

  /**
   * Adds customer to db
   */
  addCustomer() {
    orderService.addCustomer(this.customer, () => {});
  }

  /**
   * Adds customer to db if it doesn't already exist. Then inserts a new 'Bestilling' into using either newest customer's id or
   * existing customer's id. After creating a new 'Bestilling', then uses that id, along with selected bike ids,
   * to insert into 'Bestilling_Sykkel'. Same goes for selected bikes and 'Bestilling_Utstyr'.
   */
  confirmOrder() {
    if (!this.loyalMember) {
      this.addCustomer();
    }
    // Gets the id of the newest user before performing insertions
    orderService.getLatestFromTable("Kunde", customer => {
      let customerId = customer.antall;
      let time = JSON.parse(localStorage.getItem("time"));
      let from = new Date(time.start).toISOString().slice(0, 10);
      let to = new Date(time.end).toISOString().slice(0, 10);

      // Updates customerId if customer already exists. We don't want the newest customer
      if (this.loyalMember) {
        orderService.getCustomerByEmail(this.customer.epost, customer => {
          customerId = customer.kunde_id;
        });
      }

      // Insert into Bestilling with newly created customer
      userService.getUser(localStorage.getItem("account"), user => {
        let employeeId = user.ansatt_id;
        orderService.addOrder(from, to, time.hours, customerId, employeeId, this.price.total, () => {

          // Insert into Bestilling_Sykkel and Bestilling_Utstyr using the newly created orderId from the insertion above
          orderService.getLatestFromTable("Bestilling", order => {
            let orderId = order.antall;

            // Insert every bike of this order into Bestilling_Sykkel and update it's status
            for (let bike of this.bikes) {
              orderService.addBikeOrder(orderId, bike.sykkel_id, () => {
              });
              orderService.updateBikeStatus(bike.sykkel_id, "Opptatt", this.equipment.sted, () => {});
            }

            // Insert every equipment of this order into Bestilling_Utstyr and update it's status
            for (let equip of this.equip) {
              orderService.addEquipOrder(orderId, equip.utstyr_id, () => {
              });
              orderService.updateEquipStatus(equip.utstyr_id, "Opptatt", this.equipment.sted, () => {});
            }

            history.push("/order/overview");
          });
        });
      });
    });
  }
}