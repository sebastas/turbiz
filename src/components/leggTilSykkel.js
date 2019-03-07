import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';
import { Topnav } from './Topnav';


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class leggTilSykkel extends Component {

  type = "";
  pris = "";
  beskrivelse = "";


  render() {

    return(
      <div>
      <Topnav/>
      <div className="btn-group">
          <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sykkel/utstyr </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#/leggTilUtstyr">Legg utstyr</a>
          <a class="dropdown-item" href="#/leggTilSykkel">Legg til sykkel</a>

          </div>
          </div>
      <div>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">

              <div className="form-group">
                <label htmlFor="type" className="cols-sm-2 control-label">Type</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i aria-hidden="true"/></span>
                    <input type="text" className="form-control" name="type" id="type" placeholder="Type" required={true}
                           onChange={event => (this.type = event.target.value)}/>
                  </div>
                </div>
              </div>


                <div className="form-group">
                  <label htmlFor="pris" className="cols-sm-2 control-label">Pris</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i  aria-hidden="true"/></span>

                      <input type="number"  className="form-control" name="pris" id="pris"
                             placeholder="Pris" required={true} onChange={event => (this.pris = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <div


                className="form-group">

                  <label htmlFor="beskrivelse" className="cols-sm-2 control-label">Beskrivelse</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i  aria-hidden="true"/></span>

                      <input type="text"  className="form-control" name="beskrivelse" id="beskrivelse"
                             placeholder="Beskrivelse" required={true} onChange={event => (this.beskrivelse = event.target.value)}/>

                    </div>
                  </div>
                </div>



                <p style={{display: this.isComplete ? 'none' : 'block', color: 'red'}}>Vennligst fyll inn all info</p>
                <div className="form-group ">
                  <button type="button" className="btn btn-primary btn-lg btn-block login-button" id="createSykkel" onClick={this.create}>legg til Sykkel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>

    )
  }





  create() {
    this.isComplete =  this.type.length > 0 && this.pris.length > 0 &&
      this.beskrivelse.length > 0;

    if (this.isComplete == true) {
      sykkelService.addSykkel(this.type, this.pris, this.beskrivelse, () => {
        history.push("/home");
      });
    }
  }
}
