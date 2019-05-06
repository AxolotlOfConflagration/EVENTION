import React from "react";
import { Select } from "antd";

const Option = Select.Option;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

function handleBlur() {
  console.log("blur");
}

function handleFocus() {
  console.log("focus");
}

class CitySelect extends React.Component {
  render() {
    return (
      <div>
        <div style={{ fontSize: 16 }}>
          <text>Miasto</text>
        </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Miasto"
          optionFilterProp="children"
          onChange={this.props.chooseCity}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="poznan">Poznań</Option>
          <Option value="warszawa">Warszawa</Option>
          <Option value="wroclaw">Wrocław</Option>
          <Option value="trojmiasto">Trójmiasto</Option>
          <Option value="krakow">Kraków</Option>
          <Option value="zakopane">Zakopane</Option>
        </Select>
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.addressCityError}
        </div>
      </div>
    );
  }
}

export default CitySelect;
