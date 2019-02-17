import React,{Component}from 'react'
import LoginForm from './presenter'


class Container extends Component{
    state = {
        username:"",
        password:""
    }
    render(){
        const { username, password } = this.state;
        return (
          <LoginForm
            handleInputChange={this._handleInputChange}
            handleSubmit={this._handleSubmit}
            usernameValue={username}
            passwordValue={password}
          />
        );
    }
    _handleInputChange = event => {
        // const {target:{value,name}}  = event
        const name = event.target.name
        const value = event.target.value
        // console.log(event.target.value,event.target.name)
        this.setState({
            [name]:value
            // name 에 접근해서 value를 변경하기 위해선 [name] 이런식으로 접근해서 한다. 
            // 또는 username: event.target.value 이렇게 해도 된다.  그럼 2번을 해야한다 .
            // password: event.target.value 이런식으로. 
            // 만약 그냥 name 을 하게 되면 const name = ~~~ 이렇게 되는데 [name]을 하게 되며 event.target.name:~~ 이런식으로변경이 된다. 
            // 즉 username:value 가 된다. 
            // 또한 오브젝트의 키값은 변수가 아닌 string 으로 받아들이기 때문에 저렇게 접근을 해줘야한다. 
        })
        console.log(event.target.name, event.target.value)
        

    }
    _handleSubmit = event => {
        event.preventDefault();
        // console.log(this.state)
        // redux action will be here
    }
}

export default Container;