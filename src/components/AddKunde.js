import * as React from 'react';
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

<<<<<<< HEAD
export let kundeInfo = {}; //Lager et objekt som skal lagre informasjonen med videre
=======
>>>>>>> ee78a301f114aa18173eddc5e3a37e9c68bbec68

export class AddKunde extends Component {
  isComplete = true;
  kunde = {
    navn: "",
    epost: "",
    telefon: ""
  };

  render() {
    return (
      <div>
        {' '}
        // Under er koden for inputboksene med logo på siden.I tillegg er det stilsetting på inputboksene
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
                        value={this.kunde.navn}
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
                        value={this.kunde.epost}
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
                        value={this.kunde.telefon}
                        onChange={event => (this.kunde.telefon = event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                // Koden under er validering over at all informasjonen du skriver inn er gylidg. Ellers vil du få en
                feilmelding.
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

<<<<<<< HEAD
  create() {
    kundeInfo = this.kunde; // Lagrer verdier som blir skrevet inn

    history.push('/velgUtstyr'); // Hendvender deg til neste side når du trykker videre
=======
  mounted() {
    let customer = JSON.parse(localStorage.getItem("customer"));
    if (customer) this.kunde = customer;
>>>>>>> ee78a301f114aa18173eddc5e3a37e9c68bbec68
  }

  create() {
    this.isComplete = this.kunde.navn.length > 0 && this.kunde.epost.length > 0 && this.kunde.telefon.length === 8;
    if (this.isComplete) {
      localStorage.setItem("customer", JSON.stringify(this.kunde));
      history.push('/order/new/equipment');
    }
  }
}
