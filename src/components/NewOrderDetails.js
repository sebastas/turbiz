import * as React from 'react';
import { Component } from 'react-simplified';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import { Card, Column, List, Row, Button } from './widgets';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class NewOrderDetails extends Component {

  customer = {};
  equipment = {};
  time = {};
  bikes = [];
  equip = [];
  price = {
    days: 0,
    bikes: 0,
    equip: 0,
    discount: 0,
    discountPrice: 0,
    total: 0
  };

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
                    <Column>
                      Fra dato:
                    </Column>
                    <Column>
                      {this.time.from}
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      Til dato:
                    </Column>
                    <Column>
                      {this.time.to}
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      Antall dager:
                    </Column>
                    <Column>
                      {this.price.days}
                    </Column>
                  </Row>
                </div>
                <div id="timesleie" style={{display: this.time.hours !== "0" ? 'block' : 'none'}}>
                  <Row>
                    <Column>
                      Dato:
                    </Column>
                    <Column>
                      {this.time.from}
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      Antall timer:
                    </Column>
                    <Column>
                      {this.time.hours}
                    </Column>
                  </Row>
                </div>
                <br/>
                <Row>
                  <Column>
                    Kunde:
                  </Column>
                  <Column>
                    {this.customer.navn}
                  </Column>
                </Row>
                <Row>
                  <Column>
                    Epost:
                  </Column>
                  <Column>
                    {this.customer.epost}
                  </Column>
                </Row>
                <Row>
                  <Column>
                    Telefon:
                  </Column>
                  <Column>
                    {this.customer.telefon}
                  </Column>
                </Row>
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
                          <Column width={2}><strong> {this.time.hours === "0" ? 'Dagspris' : 'Timepris'}</strong></Column>
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
          <Button.Success onClick={this.test}>Testing</Button.Success>
        </Card>
      </div>
    )
  }


  mounted() {
    this.getImports();
    this.getBikes();
    this.getEquip();
    setTimeout(this.calculatePrice, 250); // slight delay to get values in arrays
  }

  getImports() {
    let customer = JSON.parse(localStorage.getItem("customer"));
    let equipment = JSON.parse(localStorage.getItem("equipment"));
    let time = JSON.parse(localStorage.getItem("time"))
    let from = new Date(time.start);
    let to = new Date(time.end);
    console.log(customer);
    console.log(equipment);
    console.log(time);
    this.customer = customer;
    this.equipment = equipment;
    this.time = {
      from: from.toString().substring(0, 15),
      to: to.toString().substring(0, 15),
      hours: time.hours
    };
  }

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

  getEquip() {
    orderService.getEquipForOrder(this.equipment.sted, "hjelm", parseInt(this.equipment.hjelm), equip => {
      for (let i = 0; i < equip.length; i++) {
        this.equip.push(equip[i]);
      }
    });
  }

  back() {
    history.push("/order/new/time")
  }

  redirectCustomer() {
    history.push("/order/new/customer");
  }
  redirectEquipment() {
    history.push("/order/new/equipment");
  }
  redirectTime() {
    history.push("/order/new/time");
  }

  test() {
    console.log(this.bikes);
    console.log(this.equip);
    this.calculatePrice();
  }

  calculatePrice() {
    let time = JSON.parse(localStorage.getItem("time"))
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
    this.price.discount = 10;

    this.price.total = this.price.total * (1 - this.price.discount / 100);

  }

  addCustomer() {
    orderService.addCustomer(this.customer, () => {});
  }
}