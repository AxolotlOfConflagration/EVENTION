import React from "react";
import { Button } from "antd";

class CityButton extends React.Component {
  ButtonAll = ({ text }) => (
    <span style={{ paddingRight: 5 }}>
      <Button
        type={this.props.currentCity === null ? "primary" : "ghost"}
        size="default"
        shape="round"
        onClick={() => this.props.chooseCity(null)}
      >
        {text}
      </Button>
    </span>
  );

  ButtonText = ({ text, value }) => (
    <span style={{ paddingRight: 5 }}>
      <Button
        type={this.props.currentCity === value ? "primary" : "ghost"}
        size="default"
        shape="round"
        onClick={() => this.props.chooseCity(value)}
      >
        {text}
      </Button>
    </span>
  );

  render() {
    return (
      <div>
        <this.ButtonAll text="Wszystkie" />
        <this.ButtonText text="Poznań" value="Poznań" />
        <this.ButtonText text="Warszawa" value="Warszawa" />
        <this.ButtonText text="Wrocław" value="Wroclaw" />
        <this.ButtonText text="Trójmiasto" value="Trójmiasto" />
        <this.ButtonText text="Kraków" value="Kraków" />
        <this.ButtonText text="Zakopane" value="Zakopane" />
      </div>
    );
  }
}

export default CityButton;
