import * as React from 'react';
import { Component } from 'react-simplified';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
import { Topnav } from './Topnav';
import { registrerService } from '../services/registrer-service';

//Class for registrer page

export class Registrer extends Component {
  render() {
    return (
      <div className="gradient">
        <Topnav />
        <div className="regBack">
          <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
        </div>
        <div id="containerlogo">
          <img src="../src/logo.png" id="icon" alt="User Icon" />
        </div>

        <div id="regButtons">
          <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.sReg}>
            Sykler
          </button>
          <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.tReg}>
            Tilbehør
          </button>
        </div>
      </div>
    );
  }

  sReg() {
    history.push('/bicycleReg');
  }

  tReg() {
    history.push('/eqReg');
  }

  back() {
    history.push('/home');
  }
}

//class for registrering bicycles

export class BicycleReg extends Component {
  name = '';
  type = '';
  ppt = '';
  ppd = '';
  description = '';
  status = '';
  location = 1;
  places = [];

  render() {
    return (
      <div className="gradient">
        <Topnav />

        <div className="regBack">
          <a href="#/registrer" style={{ color: 'black' }}>
            {' '}
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
          </a>
        </div>

        <div className="container-fluid">
          <div className="container">
            <div className="formBox">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h1>Sykkelregistrering</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Navn</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.name = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Type</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.type = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Pris per time</div>
                      <input
                        type="number"
                        name=""
                        className="input"
                        onChange={event => (this.ppt = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Pris per dag</div>
                      <input
                        type="number"
                        name=""
                        className="input"
                        onChange={event => (this.ppd = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Beskrivelse</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.description = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Status</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.status = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Sted</div>
                      <select className="custom-select" onChange={event => (this.location = event.target.value)}>
                        {this.places.map(place => (
                          <option key={place.sted_id} value={place.sted_id}>
                            {place.sted_navn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-success" onClick={this.save}>
                      Registrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    //Gets list of the locations
    registrerService.getPlace(this.location, place => {
      this.places = place;
    });
  }

  sReg() {
    history.push('/bicycleReg');
  }

  tReg() {
    history.push('/eqReg');
  }

  back() {
    history.push('/registrer');
  }

  save() {
    //Adds bicycle to the database
    registrerService.addBicycle(
      this.props.match.params.id,
      this.name,
      this.type,
      this.ppt,
      this.ppd,
      this.description,
      this.status,
      this.location,
      () => {}
    );
    history.push('/syklerStatus');
  }
}

//Class for registrering different equipment

export class EqReg extends Component {
  name = '';
  type = '';
  price = '';
  description = '';
  status = '';
  location = 1;
  places = [];

  render() {
    return (
      <div className="gradient">
        <Topnav />
        <div className="regBack">
          <a href="#/registrer" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
          </a>
        </div>

        <div className="container-fluid">
          <div className="container">
            <div className="formBox">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h1>Utstyrsregistrering</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox ">
                      <div className="inputText">Navn</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.name = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox">
                      <div className="inputText">Type</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.type = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox">
                      <div className="inputText">Pris</div>
                      <input
                        type="number"
                        name=""
                        className="input"
                        onChange={event => (this.price = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox">
                      <div className="inputText">Beskrivelse</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.description = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="inputBox">
                      <div className="inputText">Status</div>
                      <input
                        type="text"
                        name=""
                        className="input"
                        onChange={event => (this.status = event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputBox">
                      <div className="inputText">Sted</div>
                      <select className="custom-select" onChange={event => (this.location = event.target.value)}>
                        {this.places.map(place => (
                          <option key={place.sted_id} value={place.sted_id}>
                            {place.sted_navn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-success" id="reg" onClick={this.save}>
                      Registrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    //Gets list of the location
    registrerService.getPlace(this.location, place => {
      this.places = place;
    });
  }

  sReg() {
    history.push('/bicycleReg');
  }

  tReg() {
    history.push('/eqReg');
  }

  back() {
    history.push('/registrer');
  }

  save() {
    //Adds equipment to the database
    registrerService.addEq(
      this.props.match.params.id,
      this.name,
      this.type,
      this.price,
      this.description,
      this.status,
      this.location,
      () => {}
    );
    history.push('/tilbehorStatus');
  }
}
