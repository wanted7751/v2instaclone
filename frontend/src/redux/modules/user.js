//imports

//actions

//action creators

//Api actions

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

// reducer export

export default reducer