import Axios from 'axios';

const initialState = {
	username: null,
	userId: 0,
	isLoggedIn: false,
	profilePic: null
};

//action types
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

//action creators
export function loginUser(user) {
	return {
		type: LOGIN_USER,
		payload: user
	};
}

export default function(state = initialState, action) {
	const payload = action.payload;
	switch (action.type) {
		case LOGIN_USER:
			console.log(payload);
			return { 
				...state, 
				username: payload.username, 
				userId: payload.id,
				profilePic: payload.profile_pic, 
				isLoggedIn: true 
			};
		default:
			return state;
	}
}
