import React from "react";
import { List, Avatar, Button } from "antd";

class Users extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <List
        size="large"
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            {item.firstName ? item.firstName + " " + item.lastName : item.nick}
            <Button size="small" style={{ float: "right" }}>
              Dodaj
            </Button>
          </List.Item>
        )}
      />
    );
  }
}

export default Users;
