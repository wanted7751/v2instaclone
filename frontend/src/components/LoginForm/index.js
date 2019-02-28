import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // facebookLogin: function(access_token){
        //     dispatch(userActions.facebookLogin(access_token));
        // }
        facebookLogin: access_token =>{
            dispatch(userActions.facebookLogin(access_token));
        },
        usernameLogin: (username,password) =>{
            dispatch(userActions.usernameLogin(username,password));
            // 이렇게 하면 usernameLogin 이라는 prop 이 하나 더 생긴다. username, password argument 를 갖는 function 을. 
        }
        // 둘다 같은 표현
        // facebookLogin 이라는 함수를 container.js 에서 부르면 dispatch된다. 이하의 코드들이
        // 그 이하의 코드들은 actionCreators 에 있는 facebookLogin 이다.
        // facebookLogin: access_token *노션 object of full of function 참고 
        // 노션의 object full of function  찾아보기
    };
};

// 객체를 리턴해야 되기 때문에 이렇게 된다.

export default connect(null, mapDispatchToProps)(Container);

//첫번째 argument는 mapStateToProps 인데 없기때문에 null, 다음은 dispatch






