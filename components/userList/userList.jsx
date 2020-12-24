import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import "./userList.css";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }
  componentDidMount() {
    fetch("/user/list")
      .then((response) => response.json())
      .then((data) => this.setState({ array: data }));
  }

  render() {
    return (
      <div>
        <Typography variant="body1">Friends List:</Typography>
        <List component="nav">
          {this.state.array.map((el, ind) => {
            return (
              <Link key={ind} to={`/users/${el._id}`}>
                <ListItem>
                  <ListItemText primary={`${el.first_name} ${el.last_name}`} />
                </ListItem>
                <Divider />
              </Link>
            );
          })}
        </List>
        <Typography variant="body1">
          <Link to="/users">See all of them</Link>
        </Typography>
      </div>
    );
  }
}

export default UserList;
