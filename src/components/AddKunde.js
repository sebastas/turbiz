import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export let kundeInfo = {};

export class AddKunde extends Component {
  isComplete = true;
  kunde = {};

  render() {
    return (
      <div>
        <Topnav />
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="kunde_name" className="cols-sm-2 control-label">
                    Fullt navn
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Fullt navn"
                        required={true}
                        onChange={event => (this.kunde.navn = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="kunde_email" className="cols-sm-2 control-label">
                    Epost
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Epost"
                        required={true}
                        onChange={event => (this.kunde.epost = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="kunde_nummer" className="cols-sm-2 control-label">
                    Telefon
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-phone fa-lg" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phone"
                        placeholder="Telefonnummer"
                        required={true}
                        onChange={event => (this.kunde.telefon = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <p style={{ display: this.isComplete ? 'none' : 'block', color: 'red' }}>Vennligst fyll inn all info</p>
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block login-button"
                    id="Addkunde"
                    onClick={this.create}
                  >
                    Legg til kunde
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  create() {
    kundeInfo = this.kunde;
    //console.log(kundeInfo);
    history.push('/velgUtstyr');
  }

  /*  create() {
    this.isComplete = this.name.length > 0 && this.email.length > 0 && this.number.length === 8;

    if (this.isComplete && !this.userExists) {
      userService.addUser(this.name, this.email, this.number, () => {
        history.push('/velgUtstyr');
      });
    }
  }*/
}
