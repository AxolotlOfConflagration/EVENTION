import React from "react";
import { List, Button, Icon } from "antd";

class ShortEvent extends React.Component {
  ButtonIcon = ({ type }) => (
    <span>
      <Button
        type={type === "check" ? "primary" : "ghost"}
        size="small"
        icon={type}
      />
    </span>
  );

  ButtonText = ({ text }) => (
    <span>
      <Button type="ghost" size="small">
        {text}
      </Button>
    </span>
  );

  ButtonIconText = ({ type, text }) => (
    <span>
      <Button type="ghost" size="small" icon={type}>
        {text}
      </Button>
    </span>
  );

  IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  prepTime = time => {
    var splited = time.split("T");
    return splited[0].concat(" ", splited[1].slice(0, 5));
  };

  render() {
    return (
      <List
        itemLayout="vertical"
        bordered="true"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item
            key={item.name}
            actions={[
              <this.ButtonIconText
                type={item.saved ? "check" : "plus"}
                text="Zapisz się"
              />,
              <this.ButtonIcon type="share-alt" />,
              <this.ButtonText text=" Więcej " />,
              <this.IconText
                type="schedule"
                text={this.prepTime(item.eventStart)}
              />
            ]}
            extra={<img height={150} alt="logo" src={item.imageSource} />}
          >
            <List.Item.Meta title={item.name} description={item.address} />
            {item.shortDescription}
          </List.Item>
        )}
      />
    );
  }
}

export default ShortEvent;
