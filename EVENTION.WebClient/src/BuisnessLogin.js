import React from "react";
import MyLayout from "./containers/MyLayout";

import FormLoginBuis from "./containers/FormLoginBuis";
class BuisnessLogin extends React.Component {
  render() {
    return (
      <div className="BuisnessLogin">
        <MyLayout className="layout">
          <FormLoginBuis />
        </MyLayout>
      </div>
    );
  }
}

export default BuisnessLogin;
