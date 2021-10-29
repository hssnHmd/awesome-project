import axios from 'axios';
import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert'

export default class Register extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email : null ,
            password : null,
            passwordconf : null,
            name : null,
            statusError : null,
            errormail : null ,
            errorpassword : null ,
            error : null , 
        }
    }


    handleinputEmail = (e) => {this.setState({email : e.target.value})}
    handleinputPassword = (e) => {this.setState({password : e.target.value})}
    handleinputPasswordconf = (e) => {this.setState({passwordconf : e.target.value})}
    handleinputName = (e) => {this.setState({name : e.target.value})}
    register = () => {
        let fd = new FormData;
        fd.append('name',this.state.name);
        fd.append('email',this.state.email);
        fd.append('password',this.state.password); 
        fd.append('password_confirmation' , this.state.passwordconf);
        axios.post('http://127.0.0.1:8000/api/auth/register',fd)
        .then((data)=>{
   
            console.log("data : ",data);
        })
        .catch((error) => {
            
           
            if (error.response) {
                this.setState({
                    error : 1 , 
                    statusError : error.response.status 
                });
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
               
                if(error.response.status == 422){
                  
                if( error.response.data.errors.hasOwnProperty('email') && error.response.data.errors.hasOwnProperty('password'))
                {
                  this.setState({errormail : error.response.data.errors.email[0] ,
                     errorpassword:error.response.data.errors.password[0]})
                }
                else if ( error.response.data.errors.hasOwnProperty('email') )
                {
                    this.setState({errormail : error.response.data.errors.email[0] ,errorpassword : null})
                
                }
                else if ( error.response.data.errors.hasOwnProperty('password') )
                {
                    this.setState({errorpassword : error.response.data.errors.password[0] , errormail: null})
                
                }
                //     console.log(error.response.headers);
                 }
             
            }
          });
    }

    render() {
        return (
            <div>
                {this.state.error === 1  && this.state.statusError === 422? (<Alert severity="error">Invalide coordonnée entrée!</Alert>):null}
                {this.state.error === 1  && this.state.statusError !== 422? (<Alert severity="error">Opss something went wrong !</Alert>):null}

               <div className="card">
               
                    <div className="card-head">
                        Register : 
                    </div>
                    <div className="card-body mr-3">
                    <label> Name : </label>
                    <input className="form-control" type="text" onChange={this.handleinputName}/>
                    <br/>
                    <label> Email : </label>
                    <input className="form-control" type="text" onChange={this.handleinputEmail}/>
                    <br/>
                    <h6 className="text-danger">{this.state.errormail}</h6>
                    <br/>
                    <label> Password : </label>
                    <input className="form-control" type="password" onChange={this.handleinputPassword}/>
                    <br/>
                    <h6 className="text-danger">{this.state.errorpassword}</h6> 
                    <br/>

                    <label> Password : </label>
                    <input className="form-control" type="password" onChange={this.handleinputPasswordconf}/>
                    
                    <br/>
                    <button className="btn btn-primary" type="submit" onClick={()=>{this.register()}}> Register</button>
                    </div>

                </div>
            </div>
        )
    }
}
