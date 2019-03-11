import * as React from 'react';
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';
import { Column, Row, Button, Card, List } from './widgets';

import createHashHistory from 'history/createHashHistory';
import { utstyrService } from '../services/utstyrService';
const history = createHashHistory();

export let orderEquipment = {};

export class OrderEquipment extends Component {

  locations = [];
  selectedLocation = 1;

  bestilling = {
    terreng: 0,
    downhill: 0,
    racer: 0,
    barnesykkel: 0,
    hybrid: 0,
    sykkelveske: 0,
    barnehenger: 0,
    lastehenger: 0,
    barnesete: 0,
    hjelm: 0,
    lås: 0,
    beskytter: 0,
    lappesaker:0
  };


  render() {
    return (
      <div id="new-order-equipment">
        <Topnav />
        <Row>
          <Column>
            <Column width={1}/>
            <Column width={10}/>
            <Card title="Velg utstyr" id="order-equipment">
              <Row>
                <Column width={12}>
                  <Row>
                    <Column width={3}>
                      <label htmlFor="select-location" id="select-location-label">Velg sted</label>
                    </Column>
                    <Column width={4}>
                      <select className="custom-select" id="select-location" onChange={event => this.selectedLocation = event.target.value}>
                        {
                          this.locations.map(location => (
                            <option key={location.sted_id} value={location.sted_id}>{location.sted_navn}</option>
                          ))
                        }
                      </select>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row>
                <Column width={6}>
                  <Card title="Sykkel" id="register-bikes">
                    <Row>
                      <Column>
                        <List>
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Terrengsykkel
                              </Column>
                              <Column width={2}>
                                <input
                                  type="number"
                                  className="equipment-input"
                                  value={this.bestilling.terreng}
                                  max="3"
                                  onChange={event => this.bestilling.terreng = event.target.value}
                                />
                              </Column>
                              <Column width={6}>
                                (Ledig: 3 stk.)
                              </Column>
                            </Row>
                          </List.Item>
                        </List>
                      </Column>
                    </Row>
                  </Card>
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {
    utstyrService.getPlace(this.selectedLocation, locations => {
      this.locations = locations;
    });
  }

  next() {
    bestillingInfo = this.bestilling;
    history.push('/home');
  }
}
