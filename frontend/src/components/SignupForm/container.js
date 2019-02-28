import React,{Component} from "react";
import SignupForm from "./presenter";
import PropTypes from 'prop-types'

class Container extends Component{
    state = {
        username:"",
        password:"",
        email:"",
        name:"",
    }
    static propTypes = {
        facebookLogin:PropTypes.func.isRequired,
        createAccount:PropTypes.func.isRequired,
    }
    render(){
        const {username, password, email, name} = this.state
        return(
            <SignupForm 
                usernameValue={username}
                passwordValue={password}
                emailValue={email}
                nameValue={name}
                handleInputChange = {this._handleInputChange}
                handleSubmit = {this._handleSubmit}
                handleFacebookLogin = {this._handleFacebookLogin}
            />
        )
    }
    _handleInputChange = event => {
        const {target:{value,name}} = event
        // 이하 동문
        // const name = event.target.name
        // const value = event.target.value
        this.setState({
            [name]:value
        })
        // console.log(this.state)
        // console.log(event.target.name)
    }
    _handleSubmit = event => {
        const {createAccount} = this.props
        const {username, password, email,name } = this.state
        
        event.preventDefault();
        //  console.log(event.target.name)
        createAccount(username, password, email,name)
    }

    _handleFacebookLogin = response => {
        // console.log(response);
        const { facebookLogin } = this.props
        facebookLogin(response.accessToken)

    }
}

export default Container;
