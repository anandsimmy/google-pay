import React,{ Component,Fragment } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class auth extends Component{
    constructor(props){
      super(props)
    }
    submitHandler = () => {
    let authData={
      name:this.refs.name.value,
      email:this.refs.email.value,
      phone:this.refs.tel.value,
      password:this.refs.pass.value,
      returnSecureToken:true
    }
    let url=
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAo44qvGmXYn_78MGynwQkH2Lt9qNg_c4g'
    axios.post(url,authData)
    .then(res=>{
      console.log(res)
      this.refs.email.value=''
      this.refs.pass.value=''
      alert('Signup Successful')
      this.props.history.push('/login')
    })    
    .catch(err=>{
      console.log(err.response)
    })
  }
  render(){
   
    return(
      <div className=" sendscreen">
        <h1>SIGN UP</h1>
        <div className="input-group input-group-md inputwidth">
          <input
            className="form-control widthsize"
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
            type="tel"
            ref="tel"
            placeholder="Enter contact"
          />
          <input
            className="form-control"
            type="password"
            ref="pass"
            placeholder="Enter password"
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