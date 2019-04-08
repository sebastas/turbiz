import * as React from 'react';
import { Component } from 'react-simplified';
import { userService } from '../services/user-service';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class ChangePassword extends Component {
  currentPass = '';
  newPass = '';
  confirmPass = '';
  correctPass = true;
  areEqual = true;
  user = {};

  render() {
    return (
      <div>
        <Topnav/>
        <div className="regBack">
          <a href="#/home" style={{ color: 'black' }}>
            <span className="fa fa-arrow-circle-left fa-3x back" onClick={this.back} />
          </a>
        </div>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">
                    Gammelt passord
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="currentPass"
                        id="currentPass"
                        placeholder="Gammelt passord"
                        required={true}
                        onChange={event => (this.currentPass = event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <p style={{ display: this.correctPass ? 'none' : 'block', color: 'red' }}>
                  Vennligst oppgi riktig passord
                </p>

                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">
                    Nytt passord
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="newPass"
                        id="newPass"
                        placeholder="Nytt passord"
                        required={true}
                        onChange={event => (this.newPass = event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">
                    Gjenta passord
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="Gjenta passord"
                        required={true}
                        onChange={event => this.checkEqual(event)}
                      />
                    </div>
                  </div>
                </div>
                <p style={{ display: this.areEqual ? 'none' : 'block', color: 'red' }}>Passordene må være like</p>
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block login-button"
                    id="updatePassword"
                    onClick={this.validate}
                  >
                    Oppdater passord
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
    // Get user-info from db by account name (stored in localStorage)
    userService.getUser(localStorage.getItem('account'), user => {
      this.user = user;
    });
  }

  /**
   * Makes sure the two new passwords (new and confirm) are equal
   * @param event Changes on input
   */
  checkEqual(event) {
    this.confirmPass = event.target.value;
    this.areEqual = this.confirmPass === this.newPass;
  }

  /**
   * Makes sure the old password is correct and the two new passwords are equal. If they are, updates the user-info.
   */
  validate() {
    if (this.user.passord === this.currentPass && this.areEqual) {
      userService.updateUser(this.user.ansatt_id, this.newPass, () => {
        history.push('/');
      });
    } else this.correctPass = this.user.passord === this.currentPass;
  }

  back(){
    history.push('/home');
  }
}
