import React from "react";
import { Input, Row } from "antd";
import Users from "../components/Users";
import axios from "axios";

const Search = Input.Search;

class UsersList extends React.Component {
  state = {
    AllUsers: [],
    User: null
  };

  fetchData = () => {
    axios.get("http://localhost:9000/user").then(res => {
      console.log(res.data);
      this.setState({
        AllUsers: res.data,
        Users: res.data
      });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  findUser = search => {
    const user = this.state.AllUsers.find(user => user.nick.includes(search));
    this.setState({ User: user });
  };

  render() {
    return (
      <div>
        <Row>Szukaj znajomych</Row>
        <Row>
          <Search
            enterButton="Szukaj"
            onSearch={value => {
              this.findUser(value);
            }}
            style={{ paddingBottom: 10, paddingTop: 10 }}
          />
        </Row>
        <Row>
          <Users
            data={this.state.User ? this.state.AllUsers : [this.state.User]}
          />
        </Row>
      </div>
    );
  }
}

export default UsersList;
