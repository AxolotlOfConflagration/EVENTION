import React from "react";
import { Button } from "antd";

class CityButton extends React.Component {
  ButtonText = ({ text, type }) => (
    <span>
      <Button
        type={this.props.currentCity === text ? "primary" : "ghost"}
        size="default"
        shape="round"
        onClick={() => this.props.chooseCity(text)}
      >
        {text}
      </Button>
    </span>
  );

  render() {
    return (
      <div>
        <this.ButtonText text="Poznań" />
        <this.ButtonText text="Warszawa" />
        <this.ButtonText text="Wrocław" />
        <this.ButtonText text="Gdańsk" />
        <this.ButtonText text="Kraków" />
        <this.ButtonText text="Zakopane" />
      </div>
    );
  }
}

export default CityButton;