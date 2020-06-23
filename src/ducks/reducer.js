import Axios from "axios";

const initialState = {
    username: null,
    isLoggedIn: false,
    profilePic: null
};

//action types
const LOGIN_USER = 'LOGIN_USER';
const GET_USER = "GET_USER"
const LOGOUT_USER = 'LOGOUT_USER';

//action creators
export function loginUser(user) {
	return {
		type: LOGIN_USER,
		payload: user
	};
}
export function getUser() {
   const user = Axios.get('/auth/user')
   
   return {
       type: GET_USER,
       payload: user
   }
}

export default function(state = initialState, action) {
    const payload = action.payload
    switch(action.type) {
        case LOGIN_USER:
            return {...state, username: payload.username, profilePic: payload.profile_pic, isLoggedIn: true}
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, username: payload.username, profilePic: payload.profile_pic, isLoggedIn: true}
        case GET_USER + "_REJECTED":
            return initialState
        default:
            return initialState
    }
}
