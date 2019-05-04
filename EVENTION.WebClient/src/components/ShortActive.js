import React from "react";

import { List, Icon, Avatar } from "antd";

class ShortActive extends React.Component {
  prepTime = time => {
    var splited = time.split("T");
    return splited[0].concat(" ", splited[1].slice(0, 5));
  };
  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://img.icons8.com/windows/32/000000/contacts.png" />
                }
                title={item.user.firstName + " " + item.user.lastName}
                description={"Nick: " + item.user.nick}
              />
              <div>{"  " + item.event.name}</div>
              <Icon type={"schedule"} style={{ marginRight: 8 }} />
              {this.prepTime(item.event.eventStart)}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ShortActive;
