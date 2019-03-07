import React from "react";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/is_after/index";
import Row from "react-bootstrap/Row";
import {Column} from "./widgets";
import {Topnav} from "./Topnav";
import eachDay from "date-fns/each_day/index";

export class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    return (
      <div>
        <Topnav/>
        <Row>
          <Column width={6}>
            <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
              todayButton={"I dag"}
            />
          </Column>
          <Column width={6}>
            <DatePicker
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
            />
          </Column>
        </Row>
      </div>
    );
  }
}
