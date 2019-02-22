import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facebookLogin: access_token => {
            dispatch(userActions.facebookLogin(access_token));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);

//첫번째 argument는 mapStateToProps 인데 없기때문에 null, 다음은 dispatch






