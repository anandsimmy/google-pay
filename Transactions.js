import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const transactions = props => {
  
  let url= "https://api.tcscubo.com/banking/meniga/v1/transactions/transactions"
let config = {
  headers: {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7IlVzZXJJZCI6MTA4OCwiUGVyc29uSWQiOjEwODgsIkFkbWluSWQiOm51bGwsIkVuZHBvaW50SWQiOm51bGwsIkV4aXN0c0V4dGVybmFsbHkiOmZhbHNlLCJDdWx0dXJlIjoiZW4tR0IiLCJBdWRpdFJlY29yZCI6bnVsbCwiRm9yZWlnblJlcXVlc3RJRCI6bnVsbH0sInN1YiI6ImRvZ0BjYXQuY29tIiwiZXhwIjoxNTgyMTkxODU1fQ.LsKYUB1WFwW2mdR3jU3WqXjlcnJlBSZ5WDj4SnNHAjc",
    "cubo-accestoken":"Ol1zouOxYS2IzL3QwXdlna6BHAf6"
  }
}
let alltransactions= 'hello';
axios.get(url,config)
    .then(res=>{
      console.log(res)
      alltransactions = res.data.map( ele => {
      return (
        <li className='list-group-item'
          key={Math.random()}>
            Deposited amount of &#x20B9; {ele.amount} on {ele.date}
        </li>)
    })
    
  })   
    .catch(err=>{
      console.log('hi', err)
    })
  
  
  
  return (
    <div className="sendscreen">
      <h1>Current Balance</h1>
      <h2>&#x20B9; {props.balance}</h2>
      <ol className='list-group'>{transactions}</ol>
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
    transactions: state.transactions
  };
};

export default connect(mapStateToProps)(withRouter(transactions));
