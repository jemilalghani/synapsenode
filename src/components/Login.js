import React, { Component } from "react";
import phone from "../Media/call.svg";
import mail from "../Media/close-envelope.svg";
import profile from "../Media/man-user.svg";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      fullName: "",
      email: "",
      phone: "",
      loading: "Create User"
    };
  }
  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }
  createUser(e) {
    e.preventDefault();
    const { fullName, email, phone } = this.state;
    this.setState({ loading: "loading..." });
    axios
      .post("/api/user/createuser", {
        name: fullName,
        email,
        phoneNumbers: phone
      })
      .then(user => {
        this.setState({ user: user.data.body });
      })
      .catch(err =>
        this.setState({
          err:
            "first and last? vaild email (or test@test.com)? and vaild phone (or 901.111.1111)?",
          loading: "Create User"
        })
      );
  }
  render() {
    return !this.state.user ? (
      <div className="Login">
        <img
          className="loginLogo"
          src={
            "https://lever-client-logos.s3.amazonaws.com/16dff1b6-769e-4d60-9543-f53b90cdc26a-1548987132030.png"
          }
          alt=""
        />
        <div className="loginInputs">
          {this.state.err && <p>{this.state.err}</p>}
          <form className="loginForm" onSubmit={e => this.createUser(e)}>
            <div>
              <img className="logo profile" src={profile} alt="" />
              <input
                className="logininput"
                placeholder="Full Name"
                onChange={e => this.handleChange("fullName", e)}
              />
            </div>
            <div>
              <img className="logo mail" src={mail} alt="" />
              <input
                className="logininput"
                placeholder="Email"
                type="email"
                onChange={e => this.handleChange("email", e)}
              />
            </div>
            <div>
              <img className="logo phone" src={phone} alt="" />
              <input
                className="logininput"
                placeholder="Phone Number"
                type="tel"
                onChange={e => this.handleChange("phone", e)}
              />
            </div>
            <input
              className="createUser"
              id="UX"
              type="submit"
              value={this.state.loading}
            />
          </form>
        </div>
      </div>
    ) : (
      <Dashboard user={this.state.user} />
    );
  }
}

export default Login;
