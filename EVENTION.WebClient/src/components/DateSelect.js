import React from "react";
import { DatePicker } from "antd";

const RangePicker = DatePicker.RangePicker;

class DataSelect extends React.Component {
  render() {
    return (
      <div>
        <div>
          <text>Data</text>
        </div>
        <RangePicker
          showTime={{ format: "HH:mm" }}
          onChange={this.props.setData}
          placeholder={["Rozpoczęcie", "Zakończenie"]}
          style={{ width: 400 }}
          eventStart={this.props.eventStart}
          eventEnd={this.props.eventEnd}
        />
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.eventStartError}
        </div>
      </div>
    );
  }
}

export default DataSelect;
