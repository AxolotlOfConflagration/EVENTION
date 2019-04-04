import React from "react";
import { Select } from "antd";

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log("blur");
}

function handleFocus() {
  console.log("focus");
}

class CitySelect extends React.Component {
  render() {
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Miasto"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="poznan">Poznań</Option>
        <Option value="warszawa">Warszawa</Option>
        <Option value="wroclaw">Wrocław</Option>
      </Select>
    );
  }
}

export default CitySelect;
