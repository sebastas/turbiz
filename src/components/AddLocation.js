import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';
import {adminService} from "../services/admin-service";


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class AddLocation extends Component {
  location="";
  isComplete=true;

  render() {

    return(
      <div>
        <Topnav/>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">

                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">Stedsnavn</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-map-marker-alt fa" aria-hidden="true"/></span>
                      <input type="text" className="form-control" name="name" id="name" placeholder="Stedsnavn" required={true}
                             onChange={event => (this.location = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <p style={{display: this.isComplete ? 'none' : 'block', color: 'red'}}>Vennligst fyll inn info</p>

                <div className="form-group ">
                  <button type="button" className="btn btn-primary btn-lg btn-block login-button" id="createUser" onClick={this.create}>Opprett nytt sted</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  mounted() {

  }

  create() {
    this.isComplete=this.location.length > 1;

    if (this.isComplete) {
      adminService.addLocation(this.location, () => {
        history.push('/home');
      });
    }
  }

  isComplete() {

  }
}
