import React from "react";
import { DatePicker } from "antd";

const RangePicker = DatePicker.RangePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class CitySelect extends React.Component {
  render() {
    return (
      <div>
        <RangePicker
          onChange={onChange}
          placeholder={["Od kiedy", "Do kiedy"]}
        />
      </div>
    );
  }
}

export default CitySelect;
