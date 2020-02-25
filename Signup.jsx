import React,{ Component,Fragment } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class auth extends Component{
    constructor(props){
      super(props)
    }
    submitHandler = () => {
    let authData = JSON.stringify({
    "email": this.refs.email.value,
    "password": this.refs.pass.value,
    "culture": "string"
      });
    let url=
    'https://api.tcscubo.com/banking/meniga/v1/users/me/register'
    let config= {
    headers: {
    "accept": "text/json",
    "content-type": "text/json",
    "cubo-accesstoken": "h9mvWM65tjpyGcj0xMdeJvmEoTwu"
  }
}
    axios.post(url,authData,config)
    .then(res=>{
      console.log(res)
      this.refs.email.value=''
      this.refs.pass.value=''
      this.refs.name.value=''
      this.refs.age.value=''
      alert('Signup Successful')
      if(res.status==200)
      this.props.history.push('/login')
    })    
    .catch(err=>{
      console.log(err)
      this.refs.email.value=''
      this.refs.pass.value=''
      this.refs.name.value=''
      this.refs.age.value=''
      if(err.response.status==400){
        alert('Email might alreay registered or Weak password, Try again')
      }
      else
        alert('Signup error, Try again')
      
    })
  }
  render(){
   
    return(
      <div className=" sendscreen">
        <h1>SIGN UP</h1>
        <div className="input-group input-group-md inputwidth">
        <input
            className="form-control"
            type="text"
            ref="name"
            placeholder="Enter name"
          />
         <input
            className="form-control"
            type="email"
            ref="email"
            placeholder="Enter email"
          />
          <input
            className="form-control"
            type="password"
            ref="pass"
            placeholder="Enter password"
          />
          <input
            className="form-control"
            type="number"
            ref="age"
            placeholder="Enter Age"
          />
        </div>
        <button
          className="btn btn-success btn-sm btn-spacing"
          onClick={this.submitHandler} 
        >SignUp
        </button>
       <button
          className="btn btn-success btn-sm btn-spacing"
          onClick={()=>{this.props.history.push('/login')}}
        >
          Back to Login
        </button>
      </div>
    )
  }
}

export default auth