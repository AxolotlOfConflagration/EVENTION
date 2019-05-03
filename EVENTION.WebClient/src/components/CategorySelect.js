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
      <div>
        <div>
          <text>Kategoria</text>
        </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Kategoria"
          optionFilterProp="children"
          onChange={this.props.chooseCategory}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value={[1]}>Sport</Option>
          <Option value={[2]}>Kultura</Option>
          <Option value={[3]}>Koncert</Option>
          <Option value={[4]}>Targi</Option>
          <Option value={[6]}>Hackathon</Option>
          <Option value={[5]}>Inne</Option>
        </Select>
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.categoriesError}
        </div>
      </div>
    );
  }
}

export default CategorySelect;
