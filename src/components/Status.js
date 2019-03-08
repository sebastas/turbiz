import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Topnav } from './Topnav';
import { Home } from './Home';
import { Card, Column, List, Row, Button } from './widgets';

import { utstyrService } from '../services/utstyrService';

import createHashHistory from 'history/createHashHistory';
import { account } from './Login';
const history = createHashHistory();

export class Status extends Component {

  render(){
    return(
      <div>
      <Topnav/>
      <br/>
        <Row>
          <Column>
            <h2>Status utstyr</h2>
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width={-1}>
          <Column>
            <Button.Success onClick={this.sStatus} id="sStatus">Sykler</Button.Success>
          </Column>
          </Column>
          <Column>
            <Button.Success onClick={this.tStatus} id="tStatus">Tilbehør</Button.Success>
          </Column>
        </Row>
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
        <Row>
          <Column>
            <h3>Sykler</h3>
          </Column>
        </Row>
        <Row>
          <Column>
            <input id="searchB" type="text" placeholder="Search.." onChange={event => this.search(event)}/>
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
                <th>tilhorighet</th>
                <th>Sted</th>
                <th>bestillings_id</th>
              </tr>
            </thead>
            <tbody id="myTableB">
              {this.bicycles.map(bicycle => (
                <tr key={bicycle.sykkel_id} className="clickable-row" id={bicycle.sykkel_id} onClick={event => this.redirect(event)} onMouseOver={this.select}>
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
                </tr>
              ))}
            </tbody>
          </table>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button.Success onClick={this.goBack} id="sBackButton">Tilbake</Button.Success>
          </Column>
        </Row>
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

  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTableB tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  redirect(event) {
    let index = event.target.parentNode.id;
    history.push('/syklerStatus/' + index + '/edit');
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }

  select() {
    let root = document.getElementById('root');
    root.style.cursor = 'pointer';
  }

}

export class TilbehorStatus extends Component {
  equipments=[]

  render(){
    return(
      <div>
        <Status />
        <Row>
          <Column>
            <h3>Tilbehør</h3>
          </Column>
        </Row>
        <Row>
          <Column>
            <input id="searchE" type="text" placeholder="Search.." onChange={event => this.search(event)}/>
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
                  <th>Tilhorighet</th>
                  <th>Sted</th>
                  <th>bestilling_id</th>
                </tr>
              </thead>
              <tbody id="myTableEq">
                {this.equipments.map(equipment => (
                      <tr key={equipment.utstyr_id} className="clickable-row" id={equipment.utstyr_id} onClick={event => this.redirect(event)} onMouseOver={this.select}>
                      <td>{equipment.utstyr_id}</td>
                      <td>{equipment.navn}</td>
                      <td>{equipment.type}</td>
                      <td>{equipment.pris}</td>
                      <td>{equipment.beskrivelse}</td>
                      <td>{equipment.status}</td>
                      <td>{equipment.tilhorighet}</td>
                      <td>{equipment.sted}</td>
                      <td>{equipment.bestilling_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button.Success onClick={this.goBack} id="tBackButton">Tilbake</Button.Success>
            </Column>
          </Row>
      </div>
    )
  }

  mounted(){
    utstyrService.getEquipment(equipment => {
      this.equipments = equipment;
    });
  }

  goBack(){
    history.push("/home")
  }

  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTableEq tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  redirect(event) {
    let index = event.target.parentNode.id;
    history.push('/tilbehorStatus/' + index + '/edit');
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }

  select() {
    let root = document.getElementById('root');
    root.style.cursor = 'pointer';
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
                  <input type="text" value={this.description} onChange={event => (this.description = event.target.value)} />
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
                <div className="inputText">Tilhørighet</div>
                  <input type="text" value={this.location} onChange={event => (this.location = event.target.value)} />
              </div>
            </div>



            <div className="col-sm-6">
              <div className="inputBox ">
                <div className="inputText">Sted</div>
                  <input type="text" value={this.currentLocation} onChange={event => (this.currentLocation = event.target.value)} />
              </div>
            </div>
          </div>

        <div className="row">
          <div className="col-sm-12">
            <input type="submit" name="" className="button" value="Lagre" onClick={this.save}></input>
            <input type="submit" name="" className="button" value="Slett" onClick={this.delete}></input>
            <input type="submit" name="" className="button" value="Tilbake" onClick={this.goBack}></input>
          </div>
        </div>
    </form>
  </div>
</div>
</div>

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

  delete() {
    utstyrService.deleteBicycle(this.props.match.params.id, () => {
      history.push('/syklerStatus');
    });
  }

  goBack() {
    history.push("/syklerStatus")
  };
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
                  <input type="text" value={this.description} onChange={event => (this.description = event.target.value)} />
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
                <div className="inputText">Tilhørighet</div>
                  <input type="text" value={this.location} onChange={event => (this.location = event.target.value)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="inputBox ">
                <div className="inputText">Sted</div>
                  <input type="text" value={this.currentLocation} onChange={event => (this.currentLocation = event.target.value)} />
              </div>
            </div>
          </div>


        <div className="row">
          <div className="col-sm-12">
            <input type="submit" name="" className="button" value="Lagre" onClick={this.save}></input>
            <input type="submit" name="" className="button" value="Slett" onClick={this.delete}></input>
            <input type="submit" name="" className="button" value="Tilbake" onClick={this.goBack}></input>
          </div>
        </div>
    </form>
  </div>
</div>
</div>
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

  delete() {
    utstyrService.deleteEquipment(this.props.match.params.id, () => {
      history.push('/tilbehorStatus');
    });
  }

  goBack() {
    history.push("/tilbehorStatus")
    };


}
