import React from "react";
import axios from "axios";
import { List, Button, Icon, Drawer } from "antd";
import EventDrawer from "./EventDrawer";

class ShortEvent extends React.Component {
  state = {
    visible: false,
    eventTitle: null,
    event: null,
    eventID: null
  };

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

  closeDrawer = () => {
    this.setState({
      visible: false,
      eventID: null
    });
  };

  render() {
    return (
      <div>
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
                <this.ButtonText
                  text=" Więcej "
                  func={() => {
                    axios
                      .get("http://localhost:9000/event/".concat(item.id))
                      .then(res => {
                        this.setState({
                          event: res
                        });
                      });
                    this.setState({
                      visible: !this.state.visible,
                      eventID: item.id,
                      eventTitle: item.name
                    });
                  }}
                />,
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
        <Drawer
          title={this.state.eventTitle}
          width={640}
          placement="right"
          closable={false}
          onClose={this.closeDrawer}
          visible={this.state.visible}
        >
          <EventDrawer data={this.state.eventID} />
        </Drawer>
      </div>
    );
  }
}

export default ShortEvent;
