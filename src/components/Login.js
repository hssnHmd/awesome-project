import React, { Component } from 'react'
import axios from 'axios';
export default class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email : null ,
            password : null
        }
    }
    componentDidMount () 
    {
        console.log(this.props);
    }

    handleinputEmail = (e) => {this.setState({email : e.target.value})}
    handleinputPassword = (e) => {this.setState({password : e.target.value})}

    login = () =>{
        let req = {email : this.state.email , password :this.state.password}
        axios.post('http://127.0.0.1:8000/api/auth/login',req)
        .then((data)=>{
           localStorage.setItem('token',data.data.token.original.access_token);
           localStorage.setItem('id',data.data.me.original.id);
           window.location.href="/home"
        })
    }


    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-head">
                        Login : 
                    </div>
                    <div className="card-body mr-3">
                    <label> Email : </label>
                    <input className="form-control" type="text" onChange={this.handleinputEmail}/>
                    <br/>
                    <label> Password : </label>
                    <input className="form-control" type="password" onChange={this.handleinputPassword}/>
                    <br/>
                    <button className="btn btn-primary" type="submit" onClick={()=>{this.login()}}> Login</button>
                    </div>

                </div>
            </div>
        )
    }
}
