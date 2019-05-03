import React from "react";
import { Form, Input } from "antd";

class ImageSource extends React.Component {
  WriteForm = ({ text, w }) => (
    <span>
      <Form>
        <div>
          <text>Źródło do zdjęcia</text>
        </div>
        <Input
          placeholder={text}
          style={{ width: w }}
          onChange={this.props.setImageSource}
          type="text"
          value={this.props.imageSource}
        />
        <div style={{ fontSize: 14, color: "red" }}>
          {this.props.imageSourceError}
        </div>
      </Form>
    </span>
  );

  render() {
    return (
      <div>
        <this.WriteForm text="http://www.image.pl/image.jpg" w={400} />
        {/* <h4>{this.props.imageSource}</h4> */}
      </div>
    );
  }
}

export default ImageSource;
