import React,{ Component,Fragment } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class auth extends Component{
    constructor(props){
      super(props)
    }
    submitHandler = () => {
    let authData={
      email:this.refs.email.value,
      password:this.refs.pass.value
    }
    let url=
    'https://api.tcscubo.com/banking/meniga/v1/authentication/authentication'
    let config= {
    headers: {
    "accept": "text/json",
    "content-type": "text/json",
    "cubo-accesstoken": "h9mvWM65tjpyGcj0xMdeJvmEoTwu"
  }
}
    this.refs.email.value=''
    this.refs.pass.value=''
    axios.post(url,authData,config)
    .then(res=>{
        console.log(res)
        alert('Login Successful, Redirecting to Home Page')
        document.cookie="paymentsession="+res.data.data.accessToken;
        this.props.onTokenDispatch(res.data.data.accessToken)
        if(res.status==200)
        this.props.history.push('/')
    })    
    .catch(err=>{
      console.log(err)
      if(err.response.status==401){
        alert('Email or Password is Incorrect, Try again')
      }
      else{
        alert('Login error, Try again')
      }
    })
  }
  signUp = () => {
      this.props.history.push('/signup')
  }
  
  render(){
    return(
      <div className=" sendscreen">
        <h1>LOGIN</h1>
        <div className="input-group input-group-md inputwidth">
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
        </div>
        <button
          className="btn btn-success btn-sm btn-spacing"
          onClick={this.submitHandler}
        >
          Login
        </button>
        <button
          className="btn btn-success btn-sm btn-spacing"
          onClick={this.signUp} 
        >
          Go to SignUp
        </button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    token:state.token
  }
} 

const mapDispatchToProps = dispatch =>{ 
  return {
    onTokenDispatch:(token)=>{
      dispatch({type:"tokensave",payload:{token}})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(auth)