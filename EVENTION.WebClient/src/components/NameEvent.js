import React from "react";
import { Form, Input } from "antd";

class NameEvent extends React.Component {
  WriteForm = ({ text, w }) => (
    <span>
      <Form>
        <div>
          <text>Nazwa wydarzenia</text>
        </div>
        <Input
          placeholder={text}
          style={{ width: w }}
          onChange={this.props.setEventName}
          type="text"
          value={this.props.name}
        />
        <div style={{ fontSize: 14, color: "red" }}>{this.props.nameError}</div>
      </Form>
    </span>
  );

  render() {
    return (
      <div>
        <this.WriteForm text="Moje wydarzenie" w={400} />
        {/* <h4>{this.props.name}</h4> */}
      </div>
    );
  }
}

export default NameEvent;
