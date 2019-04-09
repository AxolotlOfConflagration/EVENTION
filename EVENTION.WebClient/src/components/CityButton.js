import React from "react";
import { Button } from "antd";

class CityButton extends React.Component {
  ButtonText = ({ text, value }) => (
    <span>
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
        <this.ButtonText text="Poznań" value="Poznan" />
        <this.ButtonText text="Warszawa" value="Warszawa" />
        <this.ButtonText text="Wrocław" value="Wroclaw" />
        <this.ButtonText text="Trójmiasto" value="Trojmiasto" />
        <this.ButtonText text="Kraków" value="Krakow" />
        <this.ButtonText text="Zakopane" value="Zakopane" />
      </div>
    );
  }
}

export default CityButton;
