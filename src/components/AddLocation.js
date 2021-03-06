import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';
import { adminService } from '../services/admin-service';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

//Class for adding a new location
export class AddLocation extends Component {
  location = '';
  address = '';
  isComplete = true;

  render() {
    return (
      <div>
        <Topnav />
        <div className="regBack">
          <a href="#/locationOverview" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
          </a>
        </div>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Stedsnavn
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-map-marker-alt fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Stedsnavn"
                        required={true}
                        onChange={event => (this.location = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Adresse
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-map-marker-alt fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Adresse"
                        required={true}
                        onChange={event => (this.address = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/*Validation when adding a new location, checking if all the information necessary is given*/}
                <p style={{ display: this.isComplete ? 'none' : 'block', color: 'red' }}>Vennligst fyll inn info</p>

                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block login-button"
                    id="createUser"
                    onClick={this.create}
                  >
                    Opprett nytt sted
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {}

  create() {
    //Validation
    this.isComplete = this.location.length > 1 && this.address.length > 1;

    if (this.isComplete) {
      //Adds the new location to the database
      adminService.addLocation(this.location, this.address, () => {});
      history.push('/locationOverview');
    }
  }

  isComplete() {}
}
