import * as React from 'react';
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';
import { Column, Row, Button, Card, List } from './widgets';

import createHashHistory from 'history/createHashHistory';
import { utstyrService } from '../services/utstyrService';
import { orderService } from '../services/order-service';
const history = createHashHistory();

export class OrderEquipment extends Component {

  locations = [];

  bestilling = {
    sted: 1,
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
  available = {};

  render() {
    return (
      <div id="new-order-equipment" className="gradient">
        <Topnav />
        <Row>
          <Column>
            <Column width={1}/>
            <Column width={10}/>
            <Card title="Legg til utstyr" id="order-equipment">
              <Row>
                <Column width={12}>
                  <Row>
                    <Column width={2}>
                      <label htmlFor="select-location" id="select-location-label">Velg sted</label>
                    </Column>
                    <Column width={4}>
                      <select className="custom-select" id="select-location" onChange={event => this.updateAvailable(event.target.value)} value={this.bestilling.sted}>
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
                  <Card title="Sykler" id="register-bikes">
                    <Row>
                      <Column>
                        <List>
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Terreng
                              </Column>
                              <Column width={4}>
                                <form>
                                  <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.terreng === 0}
                                            onClick={() => this.bestilling.terreng > 0 ? this.bestilling.terreng-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                    <input type="text" className="form-control input-number" value={this.bestilling.terreng}
                                           min="0" max={this.available.terreng} disabled={true}
                                           onChange={event => this.bestilling.terreng = event.target.value}/>
                                    <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.terreng === this.available.terreng}
                                              onClick={() => this.bestilling.terreng < this.available.terreng ? this.bestilling.terreng++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                  </div>
                                </form>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.terreng} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Terreng*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Downhill
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.downhill === 0}
                                            onClick={() => this.bestilling.downhill > 0 ? this.bestilling.downhill-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.downhill}
                                         min="0" max={this.available.downhill} disabled={true}
                                         onChange={event => this.bestilling.downhill = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.downhill === this.available.downhill}
                                              onClick={() => this.bestilling.downhill < this.available.downhill ? this.bestilling.downhill++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.downhill} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Downhill*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Racer
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.racer === 0}
                                            onClick={() => this.bestilling.racer > 0 ? this.bestilling.racer-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.racer}
                                         min="0" max={this.available.racer} disabled={true}
                                         onChange={event => this.bestilling.racer = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.racer === this.available.racer}
                                              onClick={() => this.bestilling.racer < this.available.racer ? this.bestilling.racer++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.racer} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Racer*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Barnesykkel
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.barnesykkel === 0}
                                            onClick={() => this.bestilling.barnesykkel > 0 ? this.bestilling.barnesykkel-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.barnesykkel}
                                         min="0" max={this.available.barnesykkel} disabled={true}
                                         onChange={event => this.bestilling.barnesykkel = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.barnesykkel === this.available.barnesykkel}
                                              onClick={() => this.bestilling.barnesykkel < this.available.barnesykkel ? this.bestilling.barnesykkel++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.barnesykkel} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Barnesykkel*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Hybrid
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.hybrid === 0}
                                            onClick={() => this.bestilling.hybrid > 0 ? this.bestilling.hybrid-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.hybrid}
                                         min="0" max={this.available.hybrid} disabled={true}
                                         onChange={event => this.bestilling.hybrid = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.hybrid === this.available.hybrid}
                                              onClick={() => this.bestilling.hybrid < this.available.hybrid ? this.bestilling.hybrid++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.hybrid} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Hybrid*/}
                        </List>
                      </Column>
                    </Row>
                  </Card>
                </Column>
                <Column width={6}>
                  <Card title="Utstyr" id="register-equip">
                    <Row>
                      <Column>
                        <List>
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Hjelm
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.hjelm === 0}
                                            onClick={() => this.bestilling.hjelm > 0 ? this.bestilling.hjelm-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.hjelm}
                                         min="0" max={this.available.hjelm} disabled={true}
                                         onChange={event => this.bestilling.hjelm = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.hjelm === this.available.hjelm}
                                              onClick={() => this.bestilling.hjelm < this.available.hjelm ? this.bestilling.hjelm++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.hjelm} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Hjelm*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Lås
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.lås === 0}
                                            onClick={() => this.bestilling.lås > 0 ? this.bestilling.lås-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.lås}
                                         min="0" max={this.available.lås} disabled={true}
                                         onChange={event => this.bestilling.lås = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.lås === this.available.lås}
                                              onClick={() => this.bestilling.lås < this.available.lås ? this.bestilling.lås++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.lås} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Lås*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Beskytter
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.beskytter === 0}
                                            onClick={() => this.bestilling.beskytter > 0 ? this.bestilling.beskytter-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.beskytter}
                                         min="0" max={this.available.beskytte} disabled={true}
                                         onChange={event => this.bestilling.beskytter = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.beskytter === this.available.beskytter}
                                              onClick={() => this.bestilling.beskytter < this.available.beskytter ? this.bestilling.beskytter++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.beskytter} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Beskytter*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Lappesaker
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.lappesaker === 0}
                                            onClick={() => this.bestilling.lappesaker > 0 ? this.bestilling.lappesaker-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.lappesaker}
                                         min="0" max={this.available.lappesaker} disabled={true}
                                         onChange={event => this.bestilling.lappesaker = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.lappesaker === this.available.lappesaker}
                                              onClick={() => this.bestilling.lappesaker < this.available.lappesaker ? this.bestilling.lappesaker++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.lappesaker} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Lappesaker*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Sykkelveske
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.sykkelveske === 0}
                                            onClick={() => this.bestilling.sykkelveske > 0 ? this.bestilling.sykkelveske-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.sykkelveske}
                                         min="0" max={this.available.sykkelveske} disabled={true}
                                         onChange={event => this.bestilling.sykkelveske = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.sykkelveske === this.available.sykkelveske}
                                              onClick={() => this.bestilling.sykkelveske < this.available.sykkelveske ? this.bestilling.sykkelveske++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.sykkelveske} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Sykkelveske*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Barnehenger
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.barnehenger === 0}
                                            onClick={() => this.bestilling.barnehenger > 0 ? this.bestilling.barnehenger-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.barnehenger}
                                         min="0" max={this.available.barnehenger} disabled={true}
                                         onChange={event => this.bestilling.barnehenger = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.barnehenger === this.available.barnehenger}
                                              onClick={() => this.bestilling.barnehenger < this.available.barnehenger ? this.bestilling.barnehenger++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.barnehenger} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Barnehenger*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Lastehenger
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.lastehenger === 0}
                                            onClick={() => this.bestilling.lastehenger > 0 ? this.bestilling.lastehenger-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.lastehenger}
                                         min="0" max={this.available.lastehenger} disabled={true}
                                         onChange={event => this.bestilling.lastehenger = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.lastehenger === this.available.lastehenger}
                                              onClick={() => this.bestilling.lastehenger < this.available.lastehenger ? this.bestilling.lastehenger++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.lastehenger} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Lastehenger*/}
                          <List.Item>
                            <Row>
                              <Column width={4}>
                                Barnesete
                              </Column>
                              <Column width={4}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-number" datatype="minus"
                                            disabled={this.bestilling.barnesete === 0}
                                            onClick={() => this.bestilling.barnesete > 0 ? this.bestilling.barnesete-- : null}>
                                      <span className="fa fa-minus fa"/>
                                    </button>
                                  </span>
                                  <input type="text" className="form-control input-number" value={this.bestilling.barnesete}
                                         min="0" max={this.available.barnesete} disabled={true}
                                         onChange={event => this.bestilling.barnesete = event.target.value}/>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-success btn-number" datatype="plus"
                                              disabled={this.bestilling.barnesete === this.available.barnesete}
                                              onClick={() => this.bestilling.barnesete < this.available.barnesete ? this.bestilling.barnesete++ : null}>
                                        <span className="fa fa-plus fa"/>
                                      </button>
                                    </span>
                                </div>
                              </Column>
                              <Column width={1}/>
                              <Column width={3}>
                                (Ledig: {this.available.barnesete} stk.)
                              </Column>
                            </Row>
                          </List.Item> {/*Barnesete*/}
                        </List>
                      </Column>
                    </Row>
                  </Card>
                </Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Button.Light onClick={this.back} id="order-equipment-back">Forrige</Button.Light>
                </Column>
                <Column width={8}/>
                <Column width={2}>
                <Button.Success onClick={this.next} id="order-equipment-next">Neste</Button.Success>
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {
    utstyrService.getPlace(this.bestilling.sted, locations => {
      this.locations = locations;
    });

    // Get number of available bikes from specific location
    this.updateAvailable(this.bestilling.sted);

    let equipment = JSON.parse(localStorage.getItem("equipment"));
    if (equipment) this.bestilling = equipment;
  }

  /**
   * Resets values of equipment and updates available equipment
   *
   * @param {number} location id of location to get available equipment from
   */
  updateAvailable(location) {
    this.bestilling = {
      sted: location,
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
    orderService.getAvailableBikesFromLocationType(location, 'Terreng', bikes => {
      this.available.terreng = bikes.total;
    });
    orderService.getAvailableBikesFromLocationType(location, "Downhill", bikes => {
      this.available.downhill = bikes.total;
    });
    orderService.getAvailableBikesFromLocationType(location, "Racer", bikes => {
      this.available.racer = bikes.total;
    });
    orderService.getAvailableBikesFromLocationType(location, "Barnesykkel", bikes => {
      this.available.barnesykkel = bikes.total;
    });
    orderService.getAvailableBikesFromLocationType(location, "Hybrid", bikes => {
      this.available.hybrid = bikes.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Hjelm", equip => {
      this.available.hjelm = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Lås", equip => {
      this.available.lås = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Beskytter", equip => {
      this.available.beskytter = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Lappesaker", equip => {
      this.available.lappesaker = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Sykkelveske", equip => {
      this.available.sykkelveske = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Barnehenger", equip => {
      this.available.barnehenger = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Lastehenger", equip => {
      this.available.lastehenger = equip.total;
    });
    orderService.getAvailableEquipFromLocationType(location, "Barnesete", equip => {
      this.available.barnesete = equip.total;
    });
  }

  next() {
    localStorage.setItem("equipment", JSON.stringify(this.bestilling));
    history.push('/order/new/time');
  }

  back() {
    history.push('/order/new/customer');
  }
}