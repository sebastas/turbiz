import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
import {Topnav} from "./Topnav";
import {adminService} from "../services/admin-service";
import {userService} from "../services/user-service";
import { Column, Row, Button } from './widgets';
const history = createHashHistory();


//Class for a list of all the locations currently in the database
export class LocationOverview extends Component {
  locations=[];

  render(){
    return(
      <div>
        <Topnav/>
        <br/>
        <Row>
          <Column>
            <h3>Stedsoversikt</h3>
          </Column>
          <Column>
            <Button.Success onClick={this.new}>Nytt sted</Button.Success>
          </Column>
          <Column right>
            <input id="myInput" type="text" placeholder="Search.." onChange={event => this.search(event)}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Steds ID</th>
                <th>Navn</th>
                <th>Adresse</th>
              </tr>
              </thead>
              <tbody id="myTable">
              {this.locations.map(location => (
                <tr key={location.sted_id} id={location.sted_id}>
                  <td>{location.sted_id}</td>
                  <td>{location.sted_navn}</td>
                  <td>{location.adresse}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {
    //Gets a list of all the locations
    adminService.getLocations(locations => {
      this.locations = locations;
    });
  }

  //Function for searching in the list of locations
  search(event) {
    let value = event.target.value.toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  new() {
    history.push("/newPlace")
  }

}
