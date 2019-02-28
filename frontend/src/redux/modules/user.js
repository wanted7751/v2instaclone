//imports

//actions

const SAVE_TOKEN = "SAVE_TOKEN";

//action creators

function save_token(token){
    return {
        type:SAVE_TOKEN,
        // token:token
        token
    }
}

//Api actions

function facebookLogin(access_token){
    return function (dispatch){
        fetch("/users/login/facebook/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                access_token:access_token
            })
        })
        .then(response => response.json())
        // .then(json=> console.log(json))
        .then(json=>{
            if(json.token){
                // localStorage.setItem("jwt",json.token)
                dispatch(save_token(json.token));
            }
        })
        .catch(err => console.log(err))
        // response를 한 후에 응답이 오면 json, 에러가 오면 catch err 를 잡아준다. 
    }
}

  // 미들웨어는 디스패치 메서드를 함수에 인수로 보내서,
  // 함수가 직접 액션을 보낼 수 있도록 합니다.
  
function usernameLogin(username, password){
    return function(dispatch){
        fetch("/rest-auth/login/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              username:username,
              password:password  
            })
        })
        .then(response => response.json())
        .then(json=>{
            if(json.token){
                // localStorage.setItem("jwt", json.token)
                dispatch(save_token(json.token))
            }
        })
        .catch(err => console.log(err))
    }
}


// initial state


const initialState = {
    isLoggedIn:localStorage.getItem("jwt") ? true : false
    // jwt 토큰이 있다면 true를 반환하고 결국 true || false가 된다 
}

// reducer

function reducer(state = initialState, action){
    switch(action.type){
        case SAVE_TOKEN:
        return applySetToken(state,action);

        default:
            return state;
    }
}

// reducer functions

function applySetToken(state, action){
    // const {token} = action
    const token = action.token

    localStorage.setItem("jwt",token)
    return {
        ...state,
        isLoggedIn:true,
        token:token
        // state 안에 토큰을 저장해준다. 
    }
}

// exports

const actionCreators = {
    facebookLogin: facebookLogin,
    usernameLogin
}

export {actionCreators};

// reducer export

export default reducer