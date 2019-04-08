import * as React from 'react';
import { Component } from 'react-simplified';
import { userService } from '../services/user-service';
import { Topnav } from './Topnav';
import { Card, Column, List, Row, Button } from './widgets';

import { utstyrService } from '../services/utstyrService';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

const { dialog } = require('electron').remote;
const dialogOptions = { type: 'info', buttons: ['Ja', 'Nei'], message: 'Er du sikker?' };

export class Status extends Component {
  render() {
    return (
      <div className="gradient">
        <Topnav />
        <div className="regBack">
          <a href="#/home" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back}/>
          </a>
        </div>
        <div id="containerlogo">
          <img src="../src/logo.png" id="icon" alt="User Icon" />
        </div>
        <div id="regButtons">
          <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.sStatus}>
            Sykler
          </button>
          <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.tStatus}>
            Tilbehør
          </button>
        </div>
      </div>
    );
  }
  sStatus() {
    history.push('/syklerStatus');
  }

  tStatus() {
    history.push('/tilbehorStatus');
  }

  back() {
    history.push('/home');
  }
}

//Class for a page with list of all the bicycles in the database
export class SyklerStatus extends Component {
  bicycles = [];

  render() {
    return (
      <div>
        <Topnav />
        <Row>
          <Column width={1}>
            <div className="regBack">
              <a href="#/status" style={{ color: 'black' }}>
                {' '}
                <span className="fa fa-arrow-circle-left fa-2x back" onClick={this.back} />
              </a>
            </div>
          </Column>
          <Column width={6}>
            <h3>Sykler</h3>
          </Column>
          <Column>
            <input id="searchB" type="text" placeholder="Search.." onChange={event => this.search(event)} />
          </Column>
        </Row>
        <Row>
          <Column>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th>Sykkel_id</th>
                <th>Navn</th>
                <th>Type</th>
                <th>Pris per time</th>
                <th>Pris per dag</th>
                <th>Beskrivelse</th>
                <th>Status</th>
                <th>Sted</th>
              </tr>
              </thead>
              <tbody id="myTableB">
              {this.bicycles.map(bicycle => (
                <tr
                  key={bicycle.sykkel_id}
                  className="clickable-row"
                  id={bicycle.sykkel_id}
                  onClick={event => this.redirect(event)}
                >
                  <td>{bicycle.sykkel_id}</td>
                  <td>{bicycle.navn}</td>
                  <td>{bicycle.type}</td>
                  <td>{bicycle.ppt}</td>
                  <td>{bicycle.ppd}</td>
                  <td>{bicycle.beskrivelse}</td>
                  <td>{bicycle.status}</td>
                  <td>{bicycle.sted_navn}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className="regBack">
              <a href="#/status" style={{ color: 'black' }}>
                {' '}
                <span className="fa fa-arrow-circle-left fa-2x back" onClick={this.back} />
              </a>
            </div>
          </Column>
        </Row>
      </div>
    );
  }
  mounted() {
    //Gets a list of all the bicycles
    utstyrService.getBicycles(bicycles => {
      this.bicycles = bicycles;
    });
  }

  goBack() {
    history.push('/status');
  }

  //Function to search in the list of bicycles
  search(event) {
    let value = event.target.value.toLowerCase();
    $('#myTableB tr').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  }

  //Function to click on the bicycle currently hovered over in the list of bicycles
  redirect(event) {
    let index = event.target.parentNode.id;
    history.push('/syklerStatus/' + index + '/edit');
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }
}

//Class for a page with list of all the equipment in the database
export class TilbehorStatus extends Component {
  equipments = [];

  render() {
    return (
      <div>
        <Topnav />
        <Row>
          <Column width={1}>
            <div className="regBack">
              <a href="#/status" style={{ color: 'black' }}>
                {' '}
                <span className="fa fa-arrow-circle-left fa-2x back" onClick={this.back} />
              </a>
            </div>
          </Column>
          <Column width={6}>
            <h3>Tilbehør</h3>
          </Column>
          <Column>
            <input id="searchE" type="text" placeholder="Search.." onChange={event => this.search(event)} />
          </Column>
        </Row>
        <Row>
          <Column>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th>Utstyr_id</th>
                <th>Navn</th>
                <th>Type</th>
                <th>Pris</th>
                <th>Beskrivelse</th>
                <th>Status</th>
                <th>Sted</th>
              </tr>
              </thead>
              <tbody id="myTableEq">
              {this.equipments.map(equipment => (
                <tr
                  key={equipment.utstyr_id}
                  className="clickable-row"
                  id={equipment.utstyr_id}
                  onClick={event => this.redirect(event)}
                >
                  <td>{equipment.utstyr_id}</td>
                  <td>{equipment.navn}</td>
                  <td>{equipment.type}</td>
                  <td>{equipment.pris}</td>
                  <td>{equipment.beskrivelse}</td>
                  <td>{equipment.status}</td>
                  <td>{equipment.sted_navn}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className="regBack">
              <a href="#/status" style={{ color: 'black' }}>
                {' '}
                <span className="fa fa-arrow-circle-left fa-2x back" onClick={this.back} />
              </a>
            </div>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    //Gets a list of all the equipment from the database
    utstyrService.getEquipment(equipment => {
      this.equipments = equipment;
    });
  }

  goBack() {
    history.push('/status');
  }

  //Function to search in the list of equipment
  search(event) {
    let value = event.target.value.toLowerCase();
    $('#myTableEq tr').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  }

  //Function to click on the equipment currently hovered over in the list of equipment
  redirect(event) {
    let index = event.target.parentNode.id;
    history.push('/tilbehorStatus/' + index + '/edit');
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }
}

//Class for a page when clicked on the selected bicycle, where you can edit the information about it
export class BicycleEdit extends Component {
  name = '';
  type = '';
  ppt = '';
  ppd = '';
  description = '';
  status = '';
  location = '';
  places = [];

  render() {
    return (
      <div>
        <Topnav />
        <div className="container-fluid">
          <div className="container">
            <div className="formBox">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h1>Sykkelregistrering</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Navn</div>
                      <input type="text" value={this.name} onChange={event => (this.name = event.target.value)} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Type</div>
                      <input type="text" value={this.type} onChange={event => (this.type = event.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Pris per time</div>
                      <input type="text" value={this.ppt} onChange={event => (this.ppt = event.target.value)} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Pris per dag</div>
                      <input type="text" value={this.ppd} onChange={event => (this.ppd = event.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Beskrivelse</div>
                      <input
                        type="text"
                        value={this.description}
                        onChange={event => (this.description = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Status</div>
                      <input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Sted</div>
                      <select className="custom-select" onChange={event => (this.location = event.target.value)}>
                        {this.places.map(place => (
                          <option key={place.sted_id} value={place.sted_id}>
                            {place.sted_navn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="regDiv">
                    <Row>
                      <Column width={1}>
                        <Button.Success onClick={this.save} id="">
                          Lagre
                        </Button.Success>
                      </Column>
                      <Column width={1}>
                        <Button.Danger onClick={this.delete} id="">
                          Slett
                        </Button.Danger>
                      </Column>
                      <Column width={1}>
                        <Button.Light onClick={this.goBack} id="bicycleBack">
                          Tilbake
                        </Button.Light>
                      </Column>
                    </Row>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    //Gets the information about the selected bicycle
    utstyrService.getBicycle(this.props.match.params.id, bicycle => {
      this.name = bicycle.navn;
      this.type = bicycle.type;
      this.ppt = bicycle.ppt;
      this.ppd = bicycle.ppd;
      this.description = bicycle.beskrivelse;
      this.status = bicycle.status;
      this.location = bicycle.sted;
      utstyrService.getPlace(this.location, place => {
        this.places = place;
      });
    });
  }

  save() {
    //Saves the changes made and updates the information about the bicycle
    utstyrService.updateBicycle(
      this.props.match.params.id,
      this.name,
      this.type,
      this.ppt,
      this.ppd,
      this.description,
      this.status,
      this.location,
      () => {}
    );
    history.push('/syklerStatus');
  }

  delete() {
    //Deletes the selected bicycle from the database, and displays a messagebox as confirmation
    dialog.showMessageBox(dialogOptions, i => {
      if (i === 0) {
        utstyrService.deleteBicycle(this.props.match.params.id, () => {});
        history.push('/syklerStatus');
      }
    });
  }

  goBack() {
    history.push('/syklerStatus');
  }
}

//Class for a page when clicked on the selected equipment, where you can edit the information about it
export class EquipmentEdit extends Component {
  name = '';
  type = '';
  price = '';
  description = '';
  status = '';
  location = '';
  places = [];

  render() {
    return (
      <div>
        <Topnav />
        <div className="container-fluid">
          <div className="container">
            <div className="formBox">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h1>Sykkelregistrering</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Navn</div>
                      <input type="text" value={this.name} onChange={event => (this.name = event.target.value)} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Type</div>
                      <input type="text" value={this.type} onChange={event => (this.type = event.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Pris</div>
                      <input type="text" value={this.price} onChange={event => (this.price = event.target.value)} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Beskrivelse</div>
                      <input
                        type="text"
                        value={this.description}
                        onChange={event => (this.description = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Status</div>
                      <input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Sted</div>
                      <select className="custom-select" onChange={event => (this.location = event.target.value)}>
                        {this.places.map(place => (
                          <option key={place.sted_id} value={place.sted_id}>
                            {place.sted_navn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                  <div className="regDiv">
                    <Row>
                      <Column width={1}>
                        <Button.Success onClick={this.save} id="">
                          Lagre
                        </Button.Success>
                      </Column>
                      <Column width={1}>
                        <Button.Danger onClick={this.delete} id="">
                          Slett
                        </Button.Danger>
                      </Column>
                      <Column width={1}>
                        <Button.Light onClick={this.goBack} id="eqBack">
                          Tilbake
                        </Button.Light>
                      </Column>
                    </Row>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    //Gets the information about the selected equipment
    utstyrService.getEquip(this.props.match.params.id, equip => {
      this.name = equip.navn;
      this.type = equip.type;
      this.price = equip.pris;
      this.description = equip.beskrivelse;
      this.status = equip.status;
      this.location = equip.sted;
      utstyrService.getPlace(this.location, place => {
        this.places = place;
      });
    });
  }

  save() {
    //Saves the changes made to the information about the equipment
    utstyrService.updateEquipment(
      this.props.match.params.id,
      this.name,
      this.type,
      this.price,
      this.description,
      this.status,
      this.location,
      () => {}
    );
    history.push('/tilbehorStatus');
  }

  delete() {
    //Deletes the selected equipment from the database, and shows a messagebox to confirm the deletion
    dialog.showMessageBox(dialogOptions, i => {
      if (i === 0) {
        utstyrService.deleteEquipment(this.props.match.params.id, () => {});
        history.push('/tilbehorStatus');
      }
    });
  }

  goBack() {
    history.push('/tilbehorStatus');
  }
}
