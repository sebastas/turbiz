import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
import {Topnav} from "./Topnav";
import {adminService} from "../services/admin-service";
import {userService} from "../services/user-service";
import { Column, Row } from './widgets';
const history = createHashHistory();

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
                <input type="text" value={this.number} onChange={event => (this.number = event.target.value)} />
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
            <input type="submit" name="" className="button" value="Lagre" onClick={this.save}></input>
            <input type="submit" name="" className="button" value="Slett" onClick={this.delete}></input>
            <input type="submit" name="" className="button" value="Tilbake" onClick={this.goBack}></input>
            <input type="submit" name="" className="button" value="Reset passord" onClick={this.resetPass}></input>
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
          history.push('/employeesOverview');
        });
      }

      delete() {
        adminService.deleteEmployee(this.props.match.params.id, () => {
          history.push('/employeesOverview');
        });
      }

      goBack() {
        history.push("/employeesOverview")
      };

      resetPass(){
        adminService.resetPassord(this.props.match.params.id, () => {

          history.push("/employeesOverview")
        })
      }
}
