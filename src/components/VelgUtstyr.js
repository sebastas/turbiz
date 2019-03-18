import * as React from 'react'; // Kobler sammen filen med de andre filene under.
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';
import { Column, Row, Button } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export let bestillingInfo = {};

export class VelgUtstyr extends Component {
<<<<<<< HEAD
  bestilling = {}; // Lager et tomt objekt som skal kunne lagre verdiene som blir skrevet inn
=======
>>>>>>> ee78a301f114aa18173eddc5e3a37e9c68bbec68

  bestilling = {
    terreng: 0,
    downhill: 0,
    racer: 0,
    barnesykkel: 0,
    hybrid: 0,
    sykkelveske: 0,
    barnehenger: 0,
    lastehenger: 0,
    barnesete: 0,
    hjelm: 0,
    lås: 0,
    beskytter: 0,
    lappesaker:0
  };


  render() {
    return (
      <div>
        {' '}
        // Kodden under viser listene over de forskjellige utstyrene du kan velge og input bokser over hvor mange av
        hvert utstyr.
        <Topnav />
        <h1 className="StorOverskrift"> Velg antall </h1>
        <Row>
          {' '}
          // Her har vi brukt widgets for å formatere elementene.
          <Column>
            <ul className="list-group">
              <h2 className="Overskrift"> Sykkel</h2>

              <ul className="list-group">
                <li className="list-group-item">
                  <label htmlFor="Terreng"> Terreng: </label>
                  <input
                    type="number"
                    className="sykkel"
                    name="Terreng"
                    value={this.bestilling.terreng}
                    onChange={event => (this.bestilling.terreng = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Downhill"> Downhill: </label>
                  <input
                    type="number"
                    className="sykkel"
                    name="Downhill"
                    value={this.bestilling.downhill}
                    onChange={event => (this.bestilling.downhill = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Racer"> Racer:</label>
                  <input
                    type="number"
                    className="sykkel"
                    name="Racer"
                    value={this.bestilling.racer}
                    onChange={event => (this.bestilling.racer = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Barnesykkel"> Barnesykkel:</label>
                  <input
                    type="number"
                    className="sykkel"
                    name="Barnesykkel"
                    value={this.bestilling.barnesykkel}
                    onChange={event => (this.bestilling.barnesykkel = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Hybrid"> Hybrid : </label>
                  <input
                    type="number"
                    className="sykkel"
                    name="Hybrid"
                    value={this.bestilling.hybrid}
                    onChange={event => (this.bestilling.hybrid = event.target.value)}
                  />
                </li>
              </ul>
            </ul>
          </Column>
          <Column>
            <ul className="list-group-2">
              <h2 className="Overskrift"> Utstyr </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <label htmlFor="Terreng"> Sykkelveske: </label>
                  <input
                    type="number"
                    className="utstyr"
                    name="Sykkelveske"
                    onChange={event => (this.bestilling.sykkelveske = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Barnehenger"> Barnehenger:</label>
                  <input
                    type="number"
                    className="utstyr"
                    name="Barnehenger"
                    onChange={event => (this.bestilling.barnehenger = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Lastehenger"> Lastehenger:</label>
                  <input
                    type="number"
                    className="utstyr"
                    name="Lastehenger"
                    onChange={event => (this.bestilling.lastehenger = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Barnesete"> Barnesete:</label>
                  <input
                    type="number"
                    className="utstyr"
                    name="Barnesete"
                    onChange={event => (this.bestilling.barnesete = event.target.value)}
                  />
                </li>
              </ul>
            </ul>
          </Column>
        </Row>
        <Row>
          <Column />
          <Column>
            <ul className="list-group-3">
              <h2 className="Overskrift"> Ekstra utstyr</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <label htmlFor="Hjelm"> Hjelm:</label>
                  <input
                    type="number"
                    className="extra"
                    name="Hjelm"
                    onChange={event => (this.bestilling.hjelm = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Lås"> Lås:</label>
                  <input
                    type="number"
                    className="extra"
                    name="Lås"
                    onChange={event => (this.bestilling.lås = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Beskytter"> Beskytter:</label>
                  <input
                    type="number"
                    className="extra"
                    name="Beskytter"
                    onChange={event => (this.bestilling.beskytter = event.target.value)}
                  />
                </li>

                <li className="list-group-item">
                  <label htmlFor="Lappesaker"> Lappesaker:</label>
                  <input
                    type="number"
                    className="extra"
                    name="Lappesaker"
                    onChange={event => (this.bestilling.lappesaker = event.target.value)}
                  />
                </li>
              </ul>
            </ul>
          </Column>
        </Row>
        <Button.Success onClick={this.next}>Neste</Button.Success>
      </div>
    );
  }
<<<<<<< HEAD
  videre() {
    bestillingInfo = this.bestilling; //Lagrer verdiene som blir skrevet inn.
    history.push('/home'); // Tar deg med til neste side når du klikker neste.
=======
  next() {
    bestillingInfo = this.bestilling;
    history.push('/home');
>>>>>>> ee78a301f114aa18173eddc5e3a37e9c68bbec68
  }
}
