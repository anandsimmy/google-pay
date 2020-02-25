import React, { Component,Fragment } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { BrowserRouter,Route } from 'react-router-dom'
import App from './App'
import Transactions from './Transactions'
import Auth from './Auth'
import Logout from './Logout'
import Signup from './Signup'

const store= createStore(reducer)

class Root extends Component{
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact component={App} />
        <Route path='/transactions' exact component={Transactions} />
        <Route path='/login' exact component={Auth} />
        <Route path='/signup' exact component={Signup} />
      </BrowserRouter>
    ) 
  }
}

render(<Provider store={store}><Root /></Provider>, document.getElementById('root'))
 