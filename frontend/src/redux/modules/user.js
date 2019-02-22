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
                access_token
            })
        })
        .then(response => response.json())
        // .then(json=> console.log(json))
        .then(json=>{
            if(json.token){
                localStorage.setItem("jwt",json.token)
                dispatch(save_token(json.token));
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
    const {token} = action
    return {
        ...state,
        isLoggedIn:true,
        token:token
        // state 안에 토큰을 저장해준다. 
    }
}

// exports

const actionCreators = {
    facebookLogin: facebookLogin
}

export {actionCreators};

// reducer export

export default reducer