import React from "react";
import {
    Form, Icon, Input, Button,
  } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}

class WriteForm extends React.Component {
  render() {
    return (
     
        <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
            <Input placeholder="Nazwa Wydarzenia" />
        </Form.Item>
        </Form>     
    );
  }
}

export default WriteForm;
