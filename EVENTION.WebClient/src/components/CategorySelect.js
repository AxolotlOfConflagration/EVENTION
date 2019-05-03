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

class CategorySelect extends React.Component {
  render() {
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Kategoria"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="sport">Sport</Option>
        <Option value="kultura">Kultura</Option>
        <Option value="koncert">Koncert</Option>
        <Option value="targi">Targi</Option>
        <Option value="hackathon">Hackathon</Option>
        <Option value="inne">Inne</Option>
      </Select>
    );
  }
}

export default CategorySelect;
