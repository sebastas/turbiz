import * as React from 'react';
import { Component } from 'react-simplified';
import {Topnav} from "./Topnav";
import {orderService} from "../services/order-service";
import { Card, Column, List, Row, Button } from './widgets';
import createHashHistory from 'history/createHashHistory';
import { utstyrService } from '../services/utstyrService';
const history = createHashHistory();

// for popup
const {dialog} = require('electron').remote;
const dialogOptions = {type: 'info', buttons: ['Ja', 'Nei'], message: 'Er du sikker?', cancelId: 1};

export class OrderDetails extends Component {

  order = {};
  customer = {};
  bikes = [];
  equipment = [];
  locations = [];
  location = 1;

  render() {
    return(
      <div className="gradient">
        <Topnav/>
        <Card id="order-details-card">
          <Row>
            <Column>
              <Button.Light id="backToOverview" onClick={this.back}>Tilbake</Button.Light>
            </Column>
          </Row>
          <Row>
            <Column width={5}>
              <Card title="Generell info" id="order-info">
                <Row>
                  <Column width={5}>
                    Bestilling id:
                  </Column>
                  <Column width={7}>
                    {this.order.id}
                  </Column>
                </Row>
                {
                  this.order.hours === "0" || this.order.hours === null ?
                    <div id="dagsleie">
                      <Row>
                        <Column width={5}>
                          Fra dato:
                        </Column>
                        <Column width={7}>
                          {this.order.from}
                        </Column>
                      </Row>
                      <Row>
                        <Column width={5}>
                          Til dato:
                        </Column>
                        <Column width={7}>
                          {this.order.to}
                        </Column>
                      </Row>
                    </div> :
                    <div id="timesleie">
                      <Row>
                        <Column width={5}>
                          Dato:
                        </Column>
                        <Column width={7}>
                          {this.order.from}
                        </Column>
                      </Row>
                      <Row>
                        <Column width={5}>
                          Antall timer:
                        </Column>
                        <Column width={7}>
                          {this.order.hours}
                        </Column>
                      </Row>
                    </div>
                }
                <Row>
                  <Column width={5}>
                    Behandler:
                  </Column>
                  <Column width={7}>
                    {this.order.processor}
                  </Column>
                </Row>
                <br/>
                <Row>
                  <Column width={5}>
                    Kunde:
                  </Column>
                  <Column width={7}>
                    {this.customer.name}
                  </Column>
                </Row>
                <Row>
                  <Column width={5}>
                    Epost:
                  </Column>
                  <Column width={7}>
                    {this.customer.email}
                  </Column>
                </Row>
                <Row>
                  <Column width={5}>
                    Telefon:
                  </Column>
                  <Column width={7}>
                    {this.customer.phone}
                  </Column>
                </Row>
                <br/>
                <Row>
                  <Column width={5}>
                    Pris:
                  </Column>
                  <Column width={7}>
                    {this.order.price} kr
                  </Column>
                </Row>
              </Card>
            </Column>
            <Column width={2}/>
            <Column width={3}>
              { this.order.delivered === 1 ?
                <div>
                  <Card id="delivered">
                    <h4>Levert</h4>
                  </Card>
                  <Card title="Slett bestilling" id="remove-order">
                    <Button.Danger onClick={this.removeOrder}>Fjern bestilling</Button.Danger>
                  </Card>
                </div> :
                <Card title="Bekreft levering" id="confirm-delivery">
                  Velg sted:
                  <select onChange={event => this.location = event.target.value} className="custom-select">
                    {
                      this.locations.map(location => (
                        <option key={location.sted_id} value={location.sted_id}>{location.sted_navn}</option>
                      ))
                    }
                  </select>
                  <Button.Success onClick={this.confirmDelivery}>Bekreft levering</Button.Success>
                  <p>NB! Marker utstyr som levert ved å bekrefte levering. Deretter kan du fjerne bestillingen</p>
                </Card>
              }
            </Column>
          </Row>
          <Row>
            <Column width={12}>
              <Card title="Utstyr som lånes" id="equipment-info">
                <Card title="Sykler">
                  <Row>
                    <Column>
                      <List.Item>
                        <Row>
                          <Column width={1}><strong>ID</strong></Column>
                          <Column width={2}><strong>Navn</strong></Column>
                          <Column width={2}><strong>Type</strong></Column>
                          <Column width={2}><strong>Dagspris</strong></Column>
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
                                <Column width={2}>{bike.ppd}</Column>
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
                        { this.equipment.map(equipment => (
                          <List.Item key={equipment.utstyr_id}>
                            <Row>
                              <Column width={1}>{equipment.utstyr_id}</Column>
                              <Column width={2}>{equipment.navn}</Column>
                              <Column width={2}>{equipment.type}</Column>
                              <Column width={2}>{equipment.pris}</Column>
                              <Column width={2}>{equipment.status}</Column>
                              <Column width={3}>{equipment.beskrivelse}</Column>
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
        </Card>
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
      this.order.delivered = order.levert;
      this.order.price = order.pris;
    });

    orderService.getBikes(this.props.match.params.id, bikes => {
      this.bikes = bikes;
    });

    orderService.getEquipment(this.props.match.params.id, equipment => {
      this.equipment = equipment;
    });

    orderService.getCustomerInfo(this.props.match.params.id, customer => {
      this.customer.name = customer.navn;
      this.customer.email = customer.epost;
      this.customer.phone = customer.tlf;
    });

    utstyrService.getPlace(1, locations => {
      this.locations = locations;
    });
  }

  confirmDelivery() {
    dialog.showMessageBox(dialogOptions, i => {
      if (i === 0) {
        for (let bike of this.bikes) {
          orderService.updateBikeStatus(bike.sykkel_id, "Ledig", this.location, () => {});
        }
        for (let equip of this.equipment) {
          orderService.updateEquipStatus(equip.utstyr_id, "Ledig", this.location, () => {});
        }
        history.push("/order/overview");
        orderService.updateOrderStatusDelivered(this.order.id, () => {});
      }
    });
  }

  removeOrder() {
    dialog.showMessageBox(dialogOptions, i => {
      if (i === 0) {
        orderService.removeOrder(this.order.id, () => {
        });
        history.push("/order/overview");
      }
    });
  }

  back() {
    history.push("/order/overview");
  }
}