import React, { Component } from "react";
import money from "../Media/dollar-symbol.svg";
import card from "../Media/credit-cards-payment.svg";
import profile from "../Media/man-user.svg";
import axios from "axios";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      clientId: "",
      friends: "",
      nodes: "",
      nickname: "",
      amount: "",
      trans: ""
    };
  }
  componentDidMount() {
    this.setState({ clientId: this.props.user._id });
    this.getFriends();
    this.getTransactions();
    this.getNodes();
  }
  getFriends() {
    axios.get("/api/user/getallusers").then(users => {
      this.setState({ friends: users.data.users });
    });
  }
  getTransactions() {
    axios.get(`/api/users/${this.state.clientId}/getusertrans`).then(trans => {
      this.setState({ trans: trans.data.trans });
    });
  }
  makeTransaction() {
    const { toNodeId, nodeId, amount } = this.state;
    if (toNodeId !== nodeId) {
      axios
        .post(`/api/users/${this.state.clientId}/createtrans`, {
          toNodeId,
          nodeId,
          amount
        })
        .then(status => {
          this.getTransactions();
          this.setState({ amount: "" });
        });
    } else {
      alert("Not Allowed to Send Money to the Same Account");
    }
  }
  getNodes() {
    axios.get(`/api/users/${this.state.clientId}/getallnodes`).then(nodes => {
      this.setState({ nodes: nodes.data.nodes });
    });
  }
  createNode() {
    this.state.nickname.length &&
      axios
        .post(`/api/users/${this.state.clientId}/createnode`, {
          accountName: this.state.nickname
        })
        .then(() => {
          this.setState({ nickname: "" });
          this.getNodes();
        });
  }
  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }
  getPayToNodes(x) {
    axios.get(`/api/users/${x}/getallnodes`).then(nodes => {
      this.setState({ accounts: nodes.data.nodes });
    });
  }
  render() {
    let friends =
      this.state.friends &&
      this.state.friends.map(el => {
        if (el.documents.length) {
          return (
            <div
              className="friendsBox"
              key={el._id}
              onClick={() => this.getPayToNodes(el._id)}
            >
              <p>{el.legal_names[0]}</p>
              <img className="friendIcon" src={profile} alt="" />
            </div>
          );
        }
      });
    let payFriend =
      this.state.accounts &&
      this.state.accounts.map(el => {
        return (
          <option value={el._id} key={el._id}>
            {el.info.nickname}
          </option>
        );
      });
    let accounts = this.state.nodes ? (
      this.state.nodes.map(el => {
        return (
          <div className="accountName">
            <img src={card} alt="" width="15px" className="creditCards" />
            {el.info.nickname}
          </div>
        );
      })
    ) : (
      <div>No Accounts</div>
    );
    let payFromAccount = this.state.nodes ? (
      this.state.nodes.map(el => {
        return <option value={el._id}>{el.info.nickname}</option>;
      })
    ) : (
      <option>No Accounts</option>
    );
    let transactions =
      this.state.trans &&
      this.state.trans.map(el => {
        return (
          <div className="history">
            <div className="completedTrans">
              <p>{el.from.nickname}</p>
              <p>
                {el.amount.amount} {el.amount.currency}
              </p>
              <p>
                {el.to.user.legal_names[0]} ({el.to.nickname})
              </p>
            </div>
            <p className="id">ID {el._id}</p>
          </div>
        );
      });
    return this.props.user._id ? (
      <div className="Dashboard">
        <div className="account">
          <h2>YOUR ACCOUNTS</h2>
          {accounts}
          <div className="new">
            To Create A New Account:
            <input
              placeholder="Account Name"
              value={this.state.nickname}
              onChange={e => this.handleChange("nickname", e)}
            />
          </div>
          <button className="createAccount" onClick={() => this.createNode()}>
            Create an Account
          </button>
        </div>
        <div className="transaction">
          <div className="payment">
            <button
              className="sendMoney"
              onClick={() => this.makeTransaction()}
            >
              Send To
            </button>
            <div className="select">
              <select
                onChange={e => this.setState({ toNodeId: e.target.value })}
              >
                <option value="None">
                  {this.state.accounts
                    ? "SELECT USER ACCOUNT"
                    : "CLICK USER TO PAY"}
                </option>
                <option value="5c86c1a64b7ba9102a5d13b4">test account</option>
                {payFriend}
              </select>
            </div>
            <div>
              <img className="money" src={money} alt="" />
              <input
                className="dollarAmount"
                placeholder="USD"
                value={this.state.amount}
                onChange={e => this.handleChange("amount", e)}
              />
            </div>
            <div>From</div>
            <div className="select">
              <select onChange={e => this.setState({ nodeId: e.target.value })}>
                <option value="None">SELECT YOUR ACCOUNT</option>
                {payFromAccount}
              </select>
            </div>
          </div>
          <div className="transactionHistory">
            <div className="title">H I S T O R Y</div>
            {transactions}
          </div>
        </div>
        <div className="friendsContainer">
          <div className="friends">
            <h1>CLICK USER TO PAY</h1>
            <div className="pushH1">{friends}</div>
          </div>
        </div>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

export default Dashboard;
