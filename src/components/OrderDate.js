import React from 'react';
import {Component} from 'react-simplified';
import DatePicker, { registerLocale } from 'react-datepicker';
import isAfter from "date-fns/isAfter";
import addDays from "date-fns/addDays";
import nb from "date-fns/locale/nb";
import { Topnav } from './Topnav';
import { Card, Column, Row, Button } from './widgets';
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();
registerLocale("nb", nb);

export class OrderDate extends Component {

  orderDate = {
    start: new Date(),
    end: new Date(),
    hours: 0
  };
  rentType = "hourly";

  render() {
    return(
      <div id="register-order-time" className="gradient">
        <Topnav/>
        <Row>
          <Column width={2}/>
          <Column width={8}>
            <Card title="Velg dato for leie" id="order-date">
              <Row>
                <Column width={6}>
                  <Row>
                    <Column width={4}>
                      <label htmlFor="dateFrom" className="date-label">Fra</label>
                    </Column>
                    <Column width={8}>
                      <DatePicker
                        id="dateFrom"
                        dateFormat="dd MMMM YYYY"
                        selected={this.orderDate.start}
                        selectsStart
                        startDate={this.orderDate.start}
                        endDate={this.orderDate.end}
                        onChange={this.handleChangeStart}
                        minDate={new Date()}
                        todayButton="I dag"
                        locale="nb"
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column width={4}>
                      <label htmlFor="dateTo" className="date-label">Til</label>
                    </Column>
                    <Column width={8}>
                      <DatePicker
                        id="dateTo"
                        dateFormat="dd MMMM YYYY"
                        selected={this.orderDate.end}
                        selectsEnd
                        startDate={this.orderDate.start}
                        endDate={this.orderDate.end}
                        onChange={this.handleChangeEnd}
                        minDate={new Date()}
                        todayButton="I dag"
                        locale="nb"
                      />
                    </Column>
                  </Row>
                </Column>
                <Column width={5}>
                  <Card title="Timesleie" id="order-date-rent-hour">
                    <select className="custom-select" onChange={event => this.orderDate.hours = event.target.value}
                            disabled={this.rentType !== 'hourly'} value={this.orderDate.hours}>
                      <option style={{display: this.rentType !== 'hourly' ? 'block' : 'none'}} value={0}>Dagsleie</option>
                      <option value={2}>2 timer</option>
                      <option value={4}>4 timer</option>
                      <option value={6}>6 timer</option>
                      <option value={8}>8 timer</option>
                    </select>
                  </Card>
                </Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Button.Light onClick={this.back} id="order-date-back">Forrige</Button.Light>
                </Column>
                <Column width={8}/>
                <Column width={2}>
                  <Button.Success onClick={this.next} id="order-date-next">Neste</Button.Success>
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {
    let time = JSON.parse(localStorage.getItem("time"));
    if (time) {
      this.orderDate.start = new Date(time.start);
      this.orderDate.end = new Date(time.end);
      this.orderDate.hours = time.hours;
    }

    if (this.formatDate(this.orderDate.start) !== this.formatDate(this.orderDate.end)) {
      this.rentType = "daily";
      this.orderDate.hours = "0";
    } else {
      this.rentType = "hourly";
    }
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.orderDate.start;
    endDate = endDate || this.orderDate.end;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    if (this.formatDate(startDate) !== this.formatDate(endDate)) {
      this.rentType = "daily";
      this.orderDate.hours = "0";
    } else {
      this.rentType = "hourly";
      this.orderDate.hours = "2";
    }

    this.orderDate.start = startDate;
    this.orderDate.end = endDate;
  };

  handleChangeStart = start => this.handleChange({ startDate: start });

  handleChangeEnd = end => this.handleChange({ endDate: end });

  formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  next() {
    localStorage.setItem("time", JSON.stringify(this.orderDate));
    history.push("/order/new/overview");
  }

  back() {
    history.push("/order/new/equipment");
  }
}