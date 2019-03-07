import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class VelgUtstyr extends Component {
  render() {
    return (
      <div>
      <Topnav/>
        <h2 className="LeggTilUtstyr"> Legg til utstyr </h2>
        <label htmlFor="Terreng"> Terreng</label>
        <input type="number" className="sykkel" name="Terreng" />
        <br />
        <label htmlFor="Downhill">Downhill</label>
        <input type="number" className="sykkel" name="Downhill">
        <br />
        <label htmlFor="Racer">Racer</label>
        <input type="number" className="sykkel" name="Racer" />
        <br />
        <label htmlFor="Barnesykkel">Barnesykkel</label>
        <input type="number" className="sykkel" name="Barnesykkel">
        <br />
        <label htmlFor="Barnesykkel">Barnesykkel</label>
        <input type="number" className="sykkel" name="Barnesykkel" />
        <br />
        <label htmlFor="Sykkeveske">Sykkelveske</label>
        <input type="number" className="utstyr" name="Sykkelveske" />
        <br />
        <label htmlFor="Barnehenger">Barnehenger</label>
        <input type="number" className="utstyr" name="Barnehenger" />
        <br />
        <label htmlFor="Lastehenger"> Lastehenger </label>
        <input type="number" className="utstyr" name="Lastehenger" />
        <br />
        <label htmlFor="Barnesete"> Barnesete</label>
        <input type="number" className="utstyr" name="Barnesete" />
        <br />
        <label htmlFor="Hjelm">Hjelm</label>
        <input type="number" className="extra" name="Barnesete" />
        <br />
        <label htmlFor="Lås">Lås</label>
        <input type="number" className="extra" name="Lås" />
        <br />
        <label htmlFor="Beskytter">Beskytter</label>
        <input type="number" className="extra" name="Beskytter" />
        <br />
        <label htmlFor="Lappesaker">Lappesaker</label>
        <input type="number" className="extra" name="Lappesaker" />
        <br />
        <button type="button" id="AddUtstyr">
          Legg til
        </button>
      </div>
    );
  }
}
