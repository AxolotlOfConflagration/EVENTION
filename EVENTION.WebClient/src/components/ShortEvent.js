import React from "react";
import axios from "axios";
import { List, Button, Icon, Drawer } from "antd";
import EventDrawer from "./EventDrawer";
import SaveButton from "./SaveButton";
import Cookies from "js-cookie";

class ShortEvent extends React.Component {
  state = {
    visible: false,
    childVisible: false,
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

  ButtonText = ({ text, func }) => (
    <span>
      <Button type="ghost" size="small" onClick={func}>
        {text}
      </Button>
    </span>
  );

  ButtonIconText = ({ type, text, func }) => (
    <span>
      <Button type="ghost" size="small" icon={type} onClick={func}>
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
          pagination={{
            onChange: page => {
              console.log(page);
              this.props.setPage(page);
            },
            pageSize: 4
          }}
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              key={item.event.name}
              actions={
                Cookies.get("BUSINESS") === "false"
                  ? [
                      <SaveButton
                        type={
                          this.props.contains(parseInt(item.event.id))
                            ? "primary"
                            : "ghost"
                        }
                        icon={
                          this.props.contains(parseInt(item.event.id))
                            ? "check"
                            : "plus"
                        }
                        text={
                          this.props.contains(parseInt(item.event.id))
                            ? "Zapisano"
                            : "Zapisz się"
                        }
                        id={item.event.id}
                        user="1"
                      />,
                      // <this.ButtonIcon type="share-alt" />,
                      <this.ButtonText
                        text=" Więcej "
                        func={() => {
                          axios
                            .get(
                              "http://localhost:9000/event/".concat(
                                item.event.id
                              )
                            )
                            .then(res => {
                              this.setState({
                                event: res
                              });
                            });
                          this.setState({
                            visible: !this.state.visible,
                            eventID: item.event.id,
                            eventTitle: item.event.name
                          });
                        }}
                      />,
                      <this.IconText
                        type="schedule"
                        text={this.prepTime(item.event.eventStart)}
                      />
                    ]
                  : [
                      <this.ButtonText
                        text=" Więcej "
                        func={() => {
                          axios
                            .get(
                              "http://localhost:9000/event/".concat(
                                item.event.id
                              )
                            )
                            .then(res => {
                              this.setState({
                                event: res
                              });
                            });
                          this.setState({
                            visible: !this.state.visible,
                            eventID: item.event.id,
                            eventTitle: item.event.name
                          });
                        }}
                      />,
                      <this.IconText
                        type="schedule"
                        text={this.prepTime(item.event.eventStart)}
                      />
                    ]
              }
              extra={
                <img height={150} alt="logo" src={item.event.imageSource} />
              }
            >
              <List.Item.Meta
                title={item.event.name}
                description={item.event.address}
              />
              {item.event.shortDescription}
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
