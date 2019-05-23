import React from "react";
import { Input, Row } from "antd";
import Users from "../components/Users";
import axios from "axios";
import Cookies from "js-cookie";

const Search = Input.Search;

class UsersList extends React.Component {
  state = {
    AllUsers: [],
    FilteredUsers: [],
    FollowedUsers: [],
    User: null
  };

  fetchData = () => {
    axios.get("http://localhost:9000/user").then(res => {
      this.setState({
        AllUsers: res.data,
        Users: res.data
      });
    });
    axios
      .get("http://localhost:9000/followers/".concat(Cookies.get("USER_ID")))
      .then(res => {
        this.setState({ FollowedUsers: res.data });
      });
  };

  contains = id => {
    let flag = false;
    this.state.FollowedUsers.forEach(user => {
      if (user.id === id) {
        flag = true;
      }
    });
    return flag;
  };

  componentDidMount() {
    this.fetchData();
  }

  findUser = search => {
    const user = this.state.AllUsers.find(user => user.nick.includes(search));
    this.setState({ User: user });
  };

  filterUsers = query => {
    console.log(this.state.AllUsers);
    const filtered = this.state.AllUsers.filter(
      user =>
        (user.firstName.trim() === "" &&
          user.lastName.trim() === "" &&
          user.nick.includes(query)) ||
        user.firstName.includes(query) ||
        user.lastName.includes(query)
    );
    this.setState({ Users: filtered });
  };

  render() {
    return (
      <div>
        <Row>Szukaj znajomych</Row>
        <Row>
          <Search
            enterButton="Szukaj"
            onChange={event => this.filterUsers(event.target.value)}
            style={{ paddingBottom: 10, paddingTop: 10 }}
          />
        </Row>
        <Row>
          <Users data={this.state.Users} contains={this.contains} />
        </Row>
      </div>
    );
  }
}

export default UsersList;
