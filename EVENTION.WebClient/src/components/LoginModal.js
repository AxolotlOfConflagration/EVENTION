import React from "react";
import { Modal, Button } from "antd";
import { createBrowserHistory } from "history";
class LoginModal extends React.Component {
  onOk() {
    const history = createBrowserHistory();
    history.push("/");
    window.location.assign("/");
  }

  render() {
    return (
      <div>
        <Modal
          title="Wybierz sposób logowania"
          visible={this.props.visible}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: true }}
          cancelText={" "}
          okText={"OK"}
          closable={false}
          onOk={this.onOk}
        >
          <Button
            type="default"
            //   onClick={this.showModal}
            style={{ zIndex: 10, width: "100%" }}
            size="large"
            href="http://localhost:9000/login"
          >
            Zaloguj się przy pomocy konta Google
          </Button>
          <p />
          <Button
            type="default"
            //   onClick={this.showModal}
            style={{ zIndex: 10, width: "100%" }}
            size="large"
            href="http://localhost:3000/BiznesoweLogowanie"
          >
            Zaloguj się jako użytkownik biznesowy
          </Button>
        </Modal>
      </div>
    );
  }
}
export default LoginModal;
