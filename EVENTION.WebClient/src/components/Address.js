import React from "react";
import { Form, Input } from "antd";

class Address extends React.Component {
  WriteForm = ({ text, w }) => (
    <span>
      <Form>
        <div>
          <text>Dokładny adres wydarzenia</text>
        </div>
        <Input
          placeholder={text}
          style={{ width: w }}
          onChange={this.props.setAddress}
          type="text"
          value={this.props.address}
        />
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.addressError}
        </div>
      </Form>
    </span>
  );

  render() {
    return (
      <div>
        <this.WriteForm
          text="
Centrum Kultury ZAMEK w Poznaniu
ul. Św. Marcin 80/82"
          w={400}
        />
        {/* <h4>{this.props.address}</h4> */}
      </div>
    );
  }
}

export default Address;
