import React from "react";
import { Form, Input } from "antd";

class ShortDesc extends React.Component {
  WriteForm = ({ text, w }) => (
    <span>
      <Form>
        <div style={{ fontSize: 16 }}>
          <text>Krótki opis wydarzenia</text>
        </div>

        <Input
          placeholder={text}
          style={{ width: w }}
          onChange={this.props.setShortDesc}
          type="text"
          value={this.props.shortDescription}
        />
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.shortDescriptionError}
        </div>
      </Form>
    </span>
  );

  render() {
    return (
      <div>
        <this.WriteForm text="Krótki opis wydarzenia..." w={500} />
        {/* <h4>{this.props.shortDescription}</h4> */}
      </div>
    );
  }
}

export default ShortDesc;
