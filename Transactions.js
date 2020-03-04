import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from 'axios'

const transactions = props => {
  console.log(props.transactionhistory && props.transactionhistory[0])
  const alltransactions= props && props.transactionhistory && props.transactionhistory.map( ele => {
        return (
        <li className='list-group-item'
          key={Math.random()}>
           Created transaction of &#x20B9; {ele.amount} on {ele.date}
        </li>)
    })
  return (
    <div className="sendscreen">
      <h1>Transactions History</h1>
      <ol className='list-group'>{alltransactions}</ol>
      <button
        className="btn btn-success btn-sm btn-spacing"
        onClick={() => props.history.push("/")} >
        Go Home
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    transactionhistory: state.transactionhistory
  };
};

export default connect(mapStateToProps,null)(transactions);
