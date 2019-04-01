import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
import {Topnav} from "./Topnav";
import {adminService} from "../services/admin-service";
import {userService} from "../services/user-service";
import { Column, Row, Button } from './widgets';
const history = createHashHistory();

const {dialog} = require('electron').remote;
const dialogOptions = {type: 'info', buttons: ['Ja', 'Nei'], message: 'Er du sikker?'};

export class EmployeeEdit extends Component{
  name="";
  email="";
  number="";
  username="";

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
            <h1>Ansatt</h1>
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
                <div className="inputText">Epost</div>
                  <input type="text" value={this.email} onChange={event => (this.email = event.target.value)} />
              </div>
            </div>
          </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="inputBox ">
              <div className="inputText">Telefon</div>
                <input type="number" value={this.number} onChange={event => (this.number = event.target.value)} />
            </div>
          </div>


            <div className="col-sm-6">
              <div className="inputBox ">
                <div className="inputText">Brukernavn</div>
                  <input type="text" value={this.username} disabled={true} onChange={event => (this.username = event.target.value)} />
              </div>
            </div>
          </div>



        <div className="row">
          <div className="col-sm-12">
          <Row>
            <Column width={1}>
              <Button.Success onClick={this.save} id="">Lagre</Button.Success>
            </Column>
            <Column width={1}>
              <Button.Light onClick={this.goBack} id="employeeBack">Tilbake</Button.Light>
            </Column>
            <Column width={1}>
              <Button.Danger onClick={this.delete} id="">Slett</Button.Danger>
            </Column>
            <Column width={2}>
              <Button.Danger onClick={this.resetPass} id="">Reset passord</Button.Danger>
            </Column>
          </Row>

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
        adminService.getEmployee(this.props.match.params.id, employee => {
          this.name = employee.navn;
          this.email = employee.epost;
          this.number = employee.tlf;
          this.username = employee.brukernavn;
        });


      }

      save() {
        adminService.updateEmployee(this.props.match.params.id, this.name, this.email, this.number, this.username, () => {
        });
        history.push('/employeesOverview');
      }

      delete() {
        dialog.showMessageBox(dialogOptions, i => {
          if (i===0){
            adminService.deleteEmployee(this.props.match.params.id, () => {
            });
            history.push('/employeesOverview');
          } else {
            history.push("/employeesOverview")
          }
        });

      }

      goBack() {
        history.push("/employeesOverview")
      };

      resetPass(){
        dialog.showMessageBox(dialogOptions, i => {
          if (i===0){
            adminService.resetPassord(this.props.match.params.id, () => {
            });
            history.push("/employeesOverview")
          } else {
            history.push("/employeesOverview")
          }
        });
      }
}
