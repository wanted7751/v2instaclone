import React,{Component} from "react";
import SignupForm from "./presenter";
import PropTypes from 'prop-types'

class Container extends Component{
    state = {
        username:"",
        password:"",
        email:"",
        fullname:"",
    }
    static propTypes = {
        facebookLogin:PropTypes.func.isRequired,
    }
    render(){
        const {username, password, email, fullname} = this.state
        return(
            <SignupForm 
                usernameValue={username}
                passwordValue={password}
                emailValue={email}
                fullnameValue={fullname}
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
    }
    _handleSubmit = event => {
        event.preventDefault();
        // console.log(event.target.name)
    }

    _handleFacebookLogin = response => {
        // console.log(response);
        const { facebookLogin } = this.props
        facebookLogin(response.accessToken)

    }
}

export default Container;
