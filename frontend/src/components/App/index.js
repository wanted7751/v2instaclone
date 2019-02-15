import {connect}from 'react-redux';
import Container from './container';



const mapStateToProps = (state, ownProps) =>{
    // store에 있는 state를 복사하는 단계
    const {user} = state;
    return {
      isLoggedIn:user.isLoggedIn
    };
};


export default connect(mapStateToProps)(Container)