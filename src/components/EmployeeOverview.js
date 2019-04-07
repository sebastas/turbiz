import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
import { Topnav } from './Topnav';
import { adminService } from '../services/admin-service';
import { userService } from '../services/user-service';
import { Column, Row, Button } from './widgets';
const history = createHashHistory();

//Class for list of employees
export class Employees extends Component {
  employees = [];

  render() {
    return (
      <div>
        <Topnav />
        <br />
        <Row>
          <Column>
            <h3>Ansattoversikt</h3>
          </Column>
          <Column>
            <Button.Success onClick={this.new}>Ny ansatt</Button.Success>
          </Column>
          <Column right>
            <input id="myInput" type="text" placeholder="Search.." onChange={event => this.search(event)} />
          </Column>
        </Row>
        <Row>
          <Column>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th>Ansatt ID</th>
                <th>Navn</th>
                <th>Epost</th>
                <th>Tlf</th>
                <th>Brukernavn</th>
              </tr>
              </thead>
              <tbody id="myTable">
              {this.employees.map(employee => (
                <tr
                  key={employee.ansatt_id}
                  id={employee.ansatt_id}
                  onClick={event => this.redirect(event)}
                  onMouseOver={this.select}
                >
                  <td>{employee.ansatt_id}</td>
                  <td>{employee.navn}</td>
                  <td>{employee.epost}</td>
                  <td>{employee.tlf}</td>
                  <td>{employee.brukernavn}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </Column>
        </Row>
        <div className="regBack">
          <a href="#/home" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-2x back" onClick={this.back} />
          </a>
        </div>
      </div>
    );
  }

  mounted() {
    //Gets list of current employees
    adminService.getEmployees(employees => {
      this.employees = employees;
    });
  }

  //Function to search in the list of employees
  search(event) {
    let value = event.target.value.toLowerCase();
    $('#myTable tr').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  }

  //Function to click on the different employees in the list and redirect them to an employee details page
  redirect(event) {
    let index = event.target.parentNode.id;
    history.push('/employeeOverview/' + index);
    let root = document.getElementById('root');
    root.style.cursor = 'default';
  }

  select() {
    let root = document.getElementById('root');
    root.style.cursor = 'pointer';
  }

  new() {
    history.push('/register');
  }
}
