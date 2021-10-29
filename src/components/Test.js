import axios from "axios";
import {React, useEffect, useState } from "react";
import parse from 'html-react-parser';


const data = {
  "customer":{
     "default_address":{
        "address1":null,
        "city":null,
        "country":null,
        "first_name":"Chaudhry",
        "user_id":1234,
        "last_name":"Talha",
        "name":"Chaudhry Talha",
        "phone":"12345667",
        "province":null,
        "zip":"12345"
     }
  }
};
export default function Test() {

  const [qr , setQr] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const MINUTE_MS = 10000;
  useEffect(() => {
 
    const interval = setInterval(() => {
    axios.get('http://192.168.0.130:8000/api/test_qr')
    
    // axios.get('http://192.168.11.114:8000/api/test_qr')
    .then((data)=>{
      console.log("data" ,data);
      setQr(data.data )
    })
    return () => clearInterval(interval); 

    }, [MINUTE_MS]);


    
  }, [])
  

  return (
    <div>
          <div id="terms-content" dangerouslySetInnerHTML={{__html: qr}}/>
              {/* <div className="row my-3">
                <div className="col-8">
                  <label className="btn btn-default p-0">
                    <input type="file" multiple onChange={this.selectFiles} />
                  </label>
                </div>

                <div className="col-4">
                  <button
                    className="btn btn-success btn-sm"
                onClick ={this.send}
                >
                    Upload
                  </button>
                </div>
              </div> */}
    </div>
  )
}





// export default class Test extends Component {
//   constructor(props) {
//     super(props);
    

//     this.state = {
//       files : null,
//       qr : null,
//     };
//   }


//   componentDidMount ()
//   {
//     axios.get('http://localhost:8000/api/test_qr')
//     .then((data)=>{
//       console.log("data" ,data);
//       this.setState({
//         qr : data.data ,
//       })
//     })
//   }

  

//   selectFiles = (e) => {
//     this.setState({
      
//       files: e.target.files,
//     });
//   }

//   send = () => {
//      let  fd = new FormData ; 
//     //  for(let i = 0 ; i < this.state.files.length ; i++)
//     //  {
//     //      fd.append(`files[${i}]`,this.state.files[i]);
//     //      console.log(i);
//     //  }
//     //  axios.post('http://127.0.0.1:8000/api/ticket/storeTicket/7',fd)
//     //  .then((data)=>{
//     //      console.log("data" , data);
//     //  })

//     fd.append('title','test from react')
//     fd.append('type','test from react')
//     fd.append('status_id_propriete',1)
//     fd.append('status_id_progression',1)
//     fd.append('type_tache','azzzz')
//     fd.append('description',' aaaa zzzzz eeee rrrrr tttt yyyyy')
//     fd.append('ticket_id',1);
//     for(let i = 1 ; i< 5; i++){
//     fd.append(`affectation[${i}]`, i);
//     }
 


//      axios.post('http://127.0.0.1:8000/api/tache/storeTache/1',fd)
//      .then((data)=>{
//        //  console.log("data" , data);
//       console.log("data : " ,data);
//      })
     
     
//   }



//   render() {
//     const qr = this.state.qr;
//     const test  = <h1> iam testion in react</h1>
//     return (
//       <div>
    
//     <div id="terms-content" dangerouslySetInnerHTML={{__html: qr}}/>





  

//         <div className="row my-3">
//           <div className="col-8">
//             <label className="btn btn-default p-0">
//               <input type="file" multiple onChange={this.selectFiles} />
//             </label>
//           </div>

//           <div className="col-4">
//             <button
//               className="btn btn-success btn-sm"
//            onClick ={this.send}
//            >
//               Upload
//             </button>
//           </div>
//         </div>
//    </div>
//     );
//   }
// }