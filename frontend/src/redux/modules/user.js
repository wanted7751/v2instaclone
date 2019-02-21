//imports

//actions

//action creators

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
        .then(json=> console.log(json))
        .catch(err => console.log(err))
    }
}

// initial state


const initialState = {
    isLoggedIn:localStorage.getItem("jwt") || false
    // jwt 토큰이 있다면 true를 반환하고 결국 true || false가 된다 
}

// reducer

function reducer(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}

// reducer functions

// exports

const actionCreators = {
    facebookLogin: facebookLogin
}

export {actionCreators};

// reducer export

export default reducer