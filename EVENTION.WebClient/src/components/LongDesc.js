import React from "react";
import { Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

class LongDesc extends React.Component {
  Area = ({ text, minR, maxR, w }) => (
    <span>
      <div style={{ fontSize: 16 }}>
        <text>Długi opis wydarzenia</text>
      </div>
      <TextArea
        placeholder={text}
        autosize={{ minRows: minR, maxRows: maxR }}
        style={{ width: w }}
        onChange={this.props.setLongDescription}
        type="text"
        value={this.props.longDescription}
      />
      <div style={{ fontSize: 14, color: "red" }}>
        {this.props.longDescriptionError}
      </div>
    </span>
  );

  render() {
    return (
      <div>
        <this.Area text="Długi opis wydarzenia..." w={500} minR={2} maxR={6} />
        {/* <h4>{this.props.longDescription}</h4> */}
      </div>
    );
  }
}

export default LongDesc;
