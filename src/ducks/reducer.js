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

export function logout() {
	return {
		type: LOGOUT_USER,
		payload: initialState
	}
}

export default function(state = initialState, action) {
	const payload = action.payload;
	switch (action.type) {
		case LOGIN_USER:
			return { 
				...state, 
				username: payload.username, 
				userId: payload.id,
				profilePic: payload.prof_pic, 
				isLoggedIn: true 
			}
		case LOGOUT_USER:	
			return initialState
		default:
			return state;
	}
}
