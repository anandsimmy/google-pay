import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import axios from 'axios'

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class App extends Component {
  constructor() {
    super();
    let token=null;
  }
  transactionHandler = () => {
    let data = JSON.stringify({
  "date": "2020-02-25T08:38:38Z",
  "text": this.refs.message.value,
  "amount": Number(this.refs.amount.value),
  "categoryId": Number(this.refs.id.value),
  "setAsRead": true
});
let url= 'https://api.tcscubo.com/banking/meniga/v1/transactions/transactions'
let config={
  headers:{
    "accept": "text/json",
    "content-type": "text/json",
    "authorization": "Bearer "+getCookie('paymentsession'),
    "cubo-accesstoken":"h9mvWM65tjpyGcj0xMdeJvmEoTwus"
  }
}
axios.post(url,data,config).then(res=>{
  console.log(res)
  let statement =
      "UPI Transaction Successful for Rs: " + this.refs.amount.value;
    alert(statement);
}).catch(err=>{
  console.log(err)
})
    
  };
  bankHandler = () => {
    this.props.onBank(
      this.props && this.props.balance,
      this.refs.amount.value
    );
    let statement =
      "Bank transaction Successful for Rs: " + this.refs.amount.value;
    alert(statement);
  };
  depositHandler = () => {
    this.props.onDeposit(
    this.props && this.props.balance, this.refs.amount.value);
    let statement = "Deposit Successful for Rs: " + this.refs.amount.value;
    alert(statement);
  };
  transactionsHandler = () => {
    this.props.history.push("/transactions");
  };
  logoutHandler = () => {
    document.cookie="paymentsession=loggedout";
    window.location.href='/login'
  }
  render() {
    if(getCookie('paymentsession')=="loggedout"){
    this.props.history.push('/login')
    }
    return (
      <div className="sendscreen">
        <h1>Google Pay</h1>
        <div className="input-group input-group-sm">
          <input
            className="form-control inputwidth"
            type="number"
            ref="amount"
            placeholder="Enter Amount"
          />
          <input
            className="form-control inputwidth"
            type="number"
            ref="id"
            placeholder="Enter Category Id"
          />
          <input
            className="form-control inputwidth"
            type="text"
            ref="message"
            placeholder="Enter Message"
          />
        </div>
        <button
          className="btn btn-success btn-sm btn-spacing"
          onClick={this.transactionHandler}
        >
          Create Transaction
        </button>
        <button className="btn btn-danger btn-sm btn-spacing btn-logout" onClick={this.logoutHandler}>
        <span className="glyphicon glyphicon-log-out"></span> Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token:state.token,
    balance: state.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTransaction: (amount, id, message) => {
      let total = Number(balance) - Number(amount);
      dispatch({
        type: "create_transaction",
        payload: { amount: Number(amount),
        id: Number(id), message: message }
      });
    },
    onBank: (balance, amount, address) => {
      let total = Number(balance) - Number(amount);
      dispatch({
        type: "bank",
        payload: { balance: Number(total), address: address, amount: Number(amount) }
      });
    },
    onDeposit: (balance, amount, address) => {
      let total = Number(balance) + Number(amount);
      dispatch({
        type: "deposit",
        payload: { balance: Number(total), address: 'self', amount: Number(amount) }
      });
    },
    onLogout:()=>{
      dispatch({type:"logout",payload:{token:null}})}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
