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

export let dateInfo = {};

export class OrderDate extends Component {

  orderDate = {
    start: new Date(),
    end: new Date(),
    hours: 0
  };
  rentType = "hourly";
  locations =[];

  render() {
    return(
      <div id="register-order-time" className="gradient">
        <Topnav/>
        <Row>
          <Column width={1}/>
          <Column width={10}>
            <Card title="Velg dato for leie" id="order-date">
              <Row>
                <Column width={1}>
                  <label htmlFor="dateFrom" className="date-label">Fra</label>
                </Column>
                <Column width={5}>
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
                <Column width={1}>
                  <label htmlFor="dateTo" className="date-label">Til</label>
                </Column>
                <Column width={5}>
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
              <div id="order-date-section2">
                <Row>
                  <Column width={6}>
                    <Card title="Velg utleveringssted">
                      <select className="custom-select" onChange={event => this.orderDate.location = event.target.value}>
                        {

                        }
                      </select>
                    </Card>
                  </Column>
                  <Column width={6}>
                    <Card title="Timesleie">
                      <select className="custom-select" onChange={event => this.orderDate.hours = event.target.value} disabled={this.rentType !== 'hourly'}>
                        <option value={2}>2 timer</option>
                        <option value={4}>4 timer</option>
                        <option value={6}>6 timer</option>
                        <option value={8}>8 timer</option>
                      </select>
                    </Card>
                  </Column>
                </Row>
              </div>
              <Row>
                <Column>
                  <Button.Light onClick={this.back}>Forrige</Button.Light>
                </Column>
                <Column right>
                  <Button.Success onClick={this.next}>Neste</Button.Success>
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </div>
    )
  }

  mounted() {

  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.orderDate.start;
    endDate = endDate || this.orderDate.end;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    if (startDate !== endDate) {
      this.rentType = "daily"
    } else {
      this.rentType = "hourly";
    }

    this.orderDate.start = startDate;
    this.orderDate.end = endDate;
  };

  handleChangeStart = start => this.handleChange({ startDate: start });

  handleChangeEnd = end => this.handleChange({ endDate: end });

  // formatDate(date) {
  //   return date.toISOString().slice(0, 10);
  // }

  next() {
    dateInfo = this.orderDate;
    // history.push("/");
  }

  back() {
    // history.push("/");
  }
}