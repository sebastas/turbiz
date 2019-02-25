import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
import { account } from './Login';
const history = createHashHistory();

export class ChangePassword extends Component {

  currentPass = "";
  newPass = "";
  confirmPass = "";
  correctPass = true;
  areEqual = true;
  user = {};

  render() {
    return(
      <div>
        <Topnav/>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">Gammelt passord</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                      <input type="password" className="form-control" name="currentPass" id="currentPass"
                             placeholder="Gammelt passord" required={true} onChange={event => (this.currentPass = event.target.value)}/>
                    </div>
                  </div>
                </div>
                <p style={{display: this.correctPass ? 'none' : 'block', color: 'red'}}>Vannligst oppgi riktig passord</p>


                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">Nytt passord</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                      <input type="password" className="form-control" name="newPass" id="newPass"
                             placeholder="Nytt passord" required={true} onChange={event => (this.newPass = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">Gjenta passord</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                      <input type="password" className="form-control" name="confirmPass" id="confirmPass"
                             placeholder="Gjenta passord" required={true} onChange={event => (this.checkEqual(event))}/>
                    </div>
                  </div>
                </div>
                <p style={{display: this.areEqual ? 'none' : 'block', color: 'red'}}>Passordene må være like</p>
                <div className="form-group ">
                  <button type="button" className="btn btn-primary btn-lg btn-block login-button" id="updatePassword" onClick={this.validate}>Oppdater passord</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  mounted() {
    userService.getUser(account, user => {
      this.user = user;
    });
  }

  checkEqual(event) {
    this.confirmPass = event.target.value;
    this.areEqual = this.confirmPass === this.newPass;
  }

  validate() {
    if (this.user.passord === this.currentPass && this.areEqual) {
      userService.updateUser(this.user.ansatt_id, this.newPass, () => {
        history.push("/");
      })
    } else if (this.user.passord !== this.currentPass) {
      this.correctPass = false;
    } else {
      this.correctPass = true
    }
  }
}