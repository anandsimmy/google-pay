import axios from 'axios'


  var data = JSON.stringify({
  "date": "2020-02-20T09:43:56Z",
  "text": "string",
  "amount": 222,
  "categoryId": 1,
  "setAsRead": true
});

var data2 = JSON.stringify({
  "data": {
    "initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "DebtorAgent": {
        "SchemeName": "BICFI",
        "Identification": "string"
      },
      "debtorAccount": {
        "SchemeName": "IBAN",
        "Identification": "11137502",
        "Name": "Miss Maya Rani",
        "SecondaryIdentification": "string"
      },
      "CreditorAgent": {
        "SchemeName": "BICFI",
        "Identification": "string"
      },
      "CreditorAccount": {
        "SchemeName": "IBAN",
        "Identification": "30020883",
        "Name": "Mrs ANNIEZ Peter Floyd",
        "SecondaryIdentification": "string"
      },
      "RemittanceInformation": {
        "Unstructured": "string",
        "Reference": "string"
      }
    },
    "Error": {
      "ErrorCode": "string",
      "ErrorMessage": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BILLPAYMENT",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "DeliveryAddress": {
      "AddressLine": [
        "string"
      ],
      "StreetName": "string",
      "BuildingNumber": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": [
        "string"
      ],
      "Country": "string"
    }
  }
});
let url="https://api.tcscubo.com/banking/meniga/v1/transactions/transactions"
let url2="https://tcscubo-test.apigee.net/banking/bancs/v1/paymentTransactionManagement/immediate-payments"

let config = {
  headers: {
    "accept": "text/json",
    "content-type": "text/json",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7IlVzZXJJZCI6MTA4OCwiUGVyc29uSWQiOjEwODgsIkFkbWluSWQiOm51bGwsIkVuZHBvaW50SWQiOm51bGwsIkV4aXN0c0V4dGVybmFsbHkiOmZhbHNlLCJDdWx0dXJlIjoiZW4tR0IiLCJBdWRpdFJlY29yZCI6bnVsbCwiRm9yZWlnblJlcXVlc3RJRCI6bnVsbH0sInN1YiI6ImRvZ0BjYXQuY29tIiwiZXhwIjoxNTgyMTk5MDM3fQ.kFd_zoH8k2NveimDzVnNP45OEup_-4wjE5qofmMYNsw",
    "cubo-accesstoken": "h9mvWM65tjpyGcj0xMdeJvmEoTwu"
  }
}
let config2 = {
  headers: {
    "accept": "application/json",
    "content-type": "application/json",
    "cubo-accesstoken": "h9mvWM65tjpyGcj0xMdeJvmEoTwu"
  }
}
const reducer = (state={balance:0,token:null,transactions:[]},action) => {


  switch(action.type){
    case 'upi':
    axios.post(url,data,config)
    .then(res=>{
      console.log(res)
      alert('payment successful for Rs:', res.data.originalAmount)
    })    
    .catch(err=>{
      console.log(err)
    })
    return {
      ...state
    }
    case 'bank':
     axios.post(url2,data2,config2)
    .then(res=>{
      console.log(res)
      alert('payment successful for Rs:', res.data.originalAmount)
    })    
    .catch(err=>{
      console.log(err)
    })
    return {
      ...state
    }
    case 'deposit':
      return {
        ...state,
        transactions:[
          {amount:action.payload.amount,
          address:action.payload.address,
          type:action.type},
          ...state.transactions.slice(0)],
        ...action.payload
      }
    return {
      ...state
    }  
    case 'tokensave':{
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