import React, {Component} from 'react'
import Auth from './presenter'


class Container extends Component{
    state = {
        action: "login"
    }
    render(){
        const {action} = this.state;
        return (
                <Auth  action={action} changeAction={this._changeAction} />
        )
    }
    _changeAction = () => {
        this.setState(prevState =>{
            const {action} = prevState;
            // const action = prevState.action 이와 같다. 
            if(action === 'login'){
                return{
                    action: "signup"
                }
            }
        })
    }
}

export default Container;