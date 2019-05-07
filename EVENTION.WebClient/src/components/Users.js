import React from "react";
import { List, Avatar, Button } from "antd";
import FollowButton from "./FollowButton";

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
            <Avatar src="https://img.icons8.com/windows/32/000000/contacts.png" />
            {item.firstName ? item.firstName + " " + item.lastName : item.nick}
            {/* <Button size="small" style={{ float: "right" }}>
              Dodaj
            </Button> */}
            <FollowButton
              type={
                this.props.contains(parseInt(item.id)) ? "primary" : "ghost"
              }
              icon={this.props.contains(parseInt(item.id)) ? "minus" : "plus"}
              text={this.props.contains(parseInt(item.id)) ? "Usuń" : "Dodaj"}
              id={item.id}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default Users;
