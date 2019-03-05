import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Topnav } from './Topnav';
import { Home } from './Home';

import { utstyrService} from '../services/utstyrService';

import createHashHistory from 'history/createHashHistory';
import { account } from './Login';
const history = createHashHistory();

export class Status extends Component {
  render(){
    return(
      <div>
        <Topnav />
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.sStatus}>Sykler</button>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.tStatus}>Tilbehør</button>
      </div>
    )
  }
  sStatus(){
    history.push("/syklerStatus")
  }

  tStatus(){
    history.push("/tilbehorStatus")
  }
}

export class SyklerStatus extends Component {
  bicycles = [];

  render(){
    return(
      <div>
        <Status />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sykkel_id</th>
              <th>Navn</th>
              <th>Type</th>
              <th>Pris per time</th>
              <th>Pris per dag</th>
              <th>Beskrivelse</th>
              <th>Status</th>
              <th>tilhorighet</th>
              <th>Sted</th>
              <th>bestillings_id</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {this.bicycles.map(bicycle => (
              <tr key={bicycle.sykkel_id}>
                <td>{bicycle.sykkel_id}</td>
                <td>{bicycle.navn}</td>
                <td>{bicycle.type}</td>
                <td>{bicycle.ppt}</td>
                <td>{bicycle.ppd}</td>
                <td>{bicycle.beskrivelse}</td>
                <td>{bicycle.status}</td>
                <td>{bicycle.tilhorighet}</td>
                <td>{bicycle.sted}</td>
                <td>{bicycle.bestilling_id}</td>
                <td><NavLink to={'/syklerStatus/' + bicycle.sykkel_id + '/edit'}>?</NavLink></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="btn btn-primary btn-sm" onClick={this.goBack}>Tilbake</button>

      </div>

    )

  }
  mounted(){
    utstyrService.getBicycles(bicycles => {
      this.bicycles = bicycles;
    });
  }

  goBack() {
    history.push("/home")
  }
}

export class TilbehorStatus extends Component {
  equpiments=[]

  render(){
    return(
      <div>
        <Status/>
        <table className="table table-striped">
  <thead>
    <tr>
      <th>Utstyr_id</th>
      <th>Navn</th>
      <th>Type</th>
      <th>Pris</th>
      <th>Beskrivelse</th>
      <th>Status</th>
      <th>Tilhorighet</th>
      <th>Sted</th>
      <th>bestilling_id</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    {this.equpiments.map(equpiment => (
      <tr key={equpiment.utstyr_id}>
        <td>{equpiment.utstyr_id}</td>
        <td>{equpiment.navn}</td>
        <td>{equpiment.type}</td>
        <td>{equpiment.pris}</td>
        <td>{equpiment.beskrivelse}</td>
        <td>{equpiment.status}</td>
        <td>{equpiment.tilhorighet}</td>
        <td>{equpiment.sted}</td>
        <td>{equpiment.bestilling_id}</td>
        <td><NavLink to={'/tilbehorStatus/' + equpiment.utstyr_id + '/edit'}>?</NavLink></td>
      </tr>
    ))}
  </tbody>
  </table>

  <button type="button" className="btn btn-primary btn-sm" onClick={this.goBack}>Tilbake</button>

      </div>
    )
  }

  mounted(){
    utstyrService.getEquipment(equipment => {
      this.equpiments = equipment;
    });
  }

  goBack(){
    history.push("/home")
  }
}

export class BicycleEdit extends Component {
  name="";
  type="";
  ppt="";
  ppd="";
  description="";
  status="";
  location="";
  currentLocation="";

  render(){
    return(
      <div>
      <Topnav />
      <form>
        Navn: <input type="text" value={this.name} onChange={event => (this.name = event.target.value)} /> <br/>
        Type: <input type="text" value={this.type} onChange={event => (this.type = event.target.value)} /> <br/>
        Pris per time: <input type="text" value={this.ppt} onChange={event => (this.ppt = event.target.value)} /> <br/>
        Pris per dag: <input type="text" value={this.ppd} onChange={event => (this.ppd = event.target.value)} /> <br/>
        Beskrivelse: <input type="text" value={this.description} onChange={event => (this.description = event.target.value)} /> <br/>
        Status: <input type="text" value={this.status} onChange={event => (this.status = event.target.value)} /> <br/>
        Tilhørighet: <input type="text" value={this.location} onChange={event => (this.location = event.target.value)} /> <br/>
        Sted: <input type="text" value={this.currentLocation} onChange={event => (this.currentLocation = event.target.value)} /> <br/>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.save}>Lagre</button>
      </form>
      </div>
    )
  }

  mounted() {
    utstyrService.getBicycle(this.props.match.params.id, bicycle => {
      this.name = bicycle.navn;
      this.type = bicycle.type;
      this.ppt = bicycle.ppt;
      this.ppd = bicycle.ppd;
      this.description = bicycle.beskrivelse;
      this.status = bicycle.status;
      this.location = bicycle.tilhorighet;
      this.currentLocation = bicycle.sted;
    });
  }

  save() {
    utstyrService.updateBicycle(this.props.match.params.id, this.name, this.type, this.ppt,
      this.ppd, this.description, this.status, this.location, this.currentLocation, () => {
      history.push('/syklerStatus');
    });
  }
}

export class EquipmentEdit extends Component {
  name="";
  type="";
  price="";
  description="";
  status="";
  location="";
  currentLocation="";


  render(){
    return(
      <div>
      <Topnav />
      <form>
        Navn: <input type="text" value={this.name} onChange={event => (this.name = event.target.value)} /> <br/>
        Type: <input type="text" value={this.type} onChange={event => (this.type = event.target.value)} /> <br/>
        Pris: <input type="text" value={this.price} onChange={event => (this.price = event.target.value)} /> <br/>
        Beskrivelse: <input type="text" value={this.description} onChange={event => (this.description = event.target.value)} /> <br/>
        Status: <input type="text" value={this.status} onChange={event => (this.status = event.target.value)} /> <br/>
        Tilhørighet: <input type="text" value={this.location} onChange={event => (this.location = event.target.value)} /> <br/>
        Sted: <input type="text" value={this.currentLocation} onChange={event => (this.currentLocation = event.target.value)} /> <br/>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.save}>Lagre</button>
      </form>
      </div>
    )
  }

  mounted() {
    utstyrService.getEquip(this.props.match.params.id, equip => {
      this.name = equip.navn;
      this.type = equip.type;
      this.price = equip.pris;
      this.description = equip.beskrivelse;
      this.status = equip.status;
      this.location = equip.tilhorighet;
      this.currentLocation = equip.sted;
    });
  }

  save() {
    utstyrService.updateEquipment(this.props.match.params.id, this.name, this.type,
      this.price, this.description, this.status, this.location, this.currentLocation, () => {
      history.push('/tilbehorStatus');
    });
  }
}
