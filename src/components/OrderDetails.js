import * as React from 'react';
import { Component } from 'react-simplified';
import {Topnav} from "./Topnav";

import createHashHistory from 'history/createHashHistory';
import {orderService} from "../services/order-service";
import {userService} from "../services/user-service";
import { Card, Column, List, Row, Button } from './widgets';
const history = createHashHistory();

// for popup
const {dialog} = require('electron').remote;
const dialogOptions = {type: 'info', buttons: ['Ja', 'Nei'], message: 'Er du sikker?'};

export class OrderDetails extends Component {

  order = {};
  bikes = [];
  equipment = [];

  render() {
    return(
      <div>
        <Topnav/>
        <Row>
          <Column width={2}/>
          <Column width={4}>
            <Card title="Generell info" id="order-info">
              <Row>
                <Column>
                  Bestilling id:
                </Column>
                <Column>
                  {this.order.id}
                </Column>
              </Row>
              <Row>
                <Column>
                  Fra dato:
                </Column>
                <Column>
                  {this.order.from}
                </Column>
              </Row>
              <Row>
                <Column>
                  Til dato:
                </Column>
                <Column>
                  {this.order.to}
                </Column>
              </Row>
              <Row>
                <Column>
                  Behandler:
                </Column>
                <Column>
                  {this.order.processor}
                </Column>
              </Row>
            </Card>
          </Column>
          <Column width={3}>
            <Button.Success onClick={this.confirmDelivery} id="confirm-delivery">Bekreft levering</Button.Success>
          </Column>
        </Row>
        <Row>
          {/*<Column width={1}/>*/}
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

    orderService.getBikes(this.props.match.params.id, bikes => {
      this.bikes = bikes;
    });

    orderService.getEquipment(this.props.match.params.id, equipment => {
      this.equipment = equipment;
    });
  }

  confirmDelivery() {
    dialog.showMessageBox(dialogOptions, i => {
      if (i === 0) {
        console.log("Utstyret ble bekreftet levert");
      } else {
        console.log("Godkjenn utstyr før du bekrefter");
      }
    });
  }
}