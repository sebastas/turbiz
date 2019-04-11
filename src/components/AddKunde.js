import * as React from 'react';
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export let kundeInfo = {}; //Lager et objekt som skal lagre informasjonen med videre | VI BRUKER IKKE DENNE LENGER

export class AddKunde extends Component {
  isComplete = true;
  numberComplete = true;
  kunde = {
    navn: '',
    epost: '',
    telefon: ''
  };

  render() {
    return (
      <div className="gradient">
        {/*Under er koden for inputboksene med logo på siden.I tillegg er det stilsetting på inputboksene*/}
        <Topnav />
        <div className="regBack">
          <a href="#/order/overview" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
          </a>
        </div>
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
                        type="number"
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
                {/*Koden under er validering over at all informasjonen du skriver inn er gylidg. Ellers vil du få en*/
                /*feilmelding.*/}
                <p style={{ display: this.isComplete ? 'none' : 'block', color: 'red' }}>Vennligst fyll inn all info</p>
                <p style={{ display: this.numberComplete ? 'none' : 'block', color: 'red' }}>
                  Ugyldig telefonnummer, vennligst skriv inn 8 tall
                </p>
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block login-button"
                    id="Addkunde"
                    onClick={this.next}
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

  mounted() {
    // If going back to change customer info while adding an order, gets that info from localStorage and displays it
    let customer = JSON.parse(localStorage.getItem('customer'));
    if (customer) this.kunde = customer;
  }

  /**
   * Goes to next page in new order process if requirements are met
   */
  next() {
    this.numberComplete = this.kunde.telefon.length === 8;
    this.isComplete = this.kunde.navn.length > 0 && this.kunde.epost.length > 0;
    if (this.isComplete && this.numberComplete) {
      localStorage.setItem('customer', JSON.stringify(this.kunde));
      history.push('/order/new/equipment');
    }
  }
}
