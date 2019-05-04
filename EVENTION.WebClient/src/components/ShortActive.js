import React from "react";
import axios from "axios";
import { List, Avatar } from "antd";

class ShortActive extends React.Component {
  state = {
    visible: false,
    eventTitle: null,
    event: null,
    eventID: null
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
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.name}
                description={item.address}
              />
              {item.shortDescription}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ShortActive;
