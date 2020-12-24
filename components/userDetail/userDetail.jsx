import React from "react";
import { Typography } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
//import { response } from "express";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    fetch("user/" + this.props.match.params.userId).then((res) =>
      this.setState({ UserDetail: res.data })
    );
    this.state = {
      userId: this.props.match.params.userId,
      UserDetail: [],
    };
  }

  componentDidUpdate(pre) {
    var prev = pre.match.params.userId;
    var now = this.props.match.params.userId;
    if (prev !== now) {
      this.setState({ userId: now });
      fetchModel("users/" + this.state.userId).then((qw) =>
        this.setState({ UserDetail: qw.data })
      );
    }
  }
  render() {
    let hun = window.cs142models.userModel(this.props.match.params.userId);
    let zurag = window.cs142models.photoOfUserModel(
      this.props.match.params.userId
    );
    return (
      <div className="UserDetail">
        <img
          src={`images/${zurag[0].file_name}`}
          alt=""
          width="300px"
          height="250px"
        />
        <Typography variant="h2">{`${hun.first_name} ${hun.last_name}`}</Typography>
        <Typography variant="h6">
          <b>Bio</b>:{`${hun.description} `}
        </Typography>
        <Typography variant="h6">
          <b>Current city</b>:{hun.location}
        </Typography>
        <Typography variant="h6">
          <b>Occupation</b>:{hun.occupation}
        </Typography>
        <Link to={`/photos/${hun._id}`}>
          <Typography variant="button">
            See Photos of {hun.first_name}
          </Typography>
        </Link>
      </div>
    );
  }
}

export default UserDetail;
