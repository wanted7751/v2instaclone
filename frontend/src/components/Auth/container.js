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
            //함수형으로 하면 단순히 setState({}) 객체를 반환해야 해서 이렇게 쓰는데 함수형으로 쓰면
            // return으로 돌려줘야 한다. 
            const {action} = prevState;
            console.log(prevState)
            // const action = prevState.action 이와 같다. 
            // callback??
            // setState 는 비동기적으로 이루어지기 때문에 객체형이 아닌 함수형으로 줘서 변형을 줘야한다. 
            if(action === 'login'){
                return{
                    action: "signup"
                }
            }else if(action === "signup"){
                return {
                    action:"login"
                }
            }
        })
    }
}
// _changeAction = () => {
//     const { action } = this.state;
//     if (action === "login") {
//         this.setState({ action: "signup" });
//     } else {
//         this.setState({ action: "login" });
//     }
// }
export default Container;