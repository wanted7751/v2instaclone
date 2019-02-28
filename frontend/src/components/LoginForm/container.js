import React,{Component}from 'react'
import LoginForm from './presenter'
import PropTypes from 'prop-types'

class Container extends Component{
    state = {
        username:"",
        password:""
    }
    static propTypes = {
        facebookLogin:PropTypes.func.isRequired,
        usernameLogin:PropTypes.func.isRequired,
    }
    render(){
        const { username, password } = this.state;
        return (
          <LoginForm
            handleInputChange={this._handleInputChange}
            handleSubmit={this._handleSubmit}
            handleFacebookLogin = {this._handleFacebookLogin}
            usernameValue={username}
            passwordValue={password}
          />
        );
    }
    _handleInputChange = event => {
        const {target:{value,name}}  = event
        // const name = event.target.name
        // const value = event.target.value
        // console.log(event.target.value,event.target.name)
        this.setState({
            [name]:value
            // name 에 접근해서 value를 변경하기 위해선 [name] 이런식으로 접근해서 한다. 
            // 그냥 name: value 하면 오브젝트성의 a:b 이런식은 앞에 변수가 아닌 a라는 string으로 간주한다.
            // 또는 username: event.target.value 이렇게 해도 된다.  그럼 2번을 해야한다 .
            // password: event.target.value 이런식으로. 
            // 만약 그냥 name 을 하게 되면 const name = ~~~ 이렇게 되는데 [name]을 하게 되며 event.target.name:~~ 이런식으로변경이 된다. 
            // 즉 username:value 가 된다. 
            // 또한 오브젝트의 키값은 변수가 아닌 string 으로 받아들이기 때문에 저렇게 접근을 해줘야한다. 
        })
        // console.log(event.target.name, event.target.value)
        

    }
    _handleSubmit = event => {
        const {usernameLogin} = this.props
        const {username, password} = this.state
        event.preventDefault();
        // console.log(this.state)
        // redux action will be here
        usernameLogin(username, password);
    }
    _handleFacebookLogin = response => {
        // console.log(response);
        // const { facebookLogin } = this.props
        const facebookLogin = this.props.facebookLogin
        // index 의 있는 값 facebookLogin 을 부르면 함수를 리턴하는 값 을 갖고온다. 어떤 함수냐면 
        facebookLogin(response.accessToken)
        // 여기 facebookLogin은 index에서 불러오는 prop 이고 이 prop은 그 dispatch를 일으키는 함수이다. 즉 action이 실행된다. 

    }
}

export default Container;