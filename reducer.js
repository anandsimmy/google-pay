import axios from 'axios'

const reducer = (state={balance:0,token:null},action) => {


  switch(action.type){ 
    case 'tokensave':{
      return{
          ...state,
          ...action.payload
        }
      }
    break 
    case 'alltransactions':{
      return{
          ...state,
          ...action.payload
        }
      }
    break 
    case 'logout':{
      return{
          ...state,
          ...action.payload
        }
      } 
      default: 
        return state 
  }
}

export default reducer