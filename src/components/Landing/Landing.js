import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';

class Landing extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			profilePic: '',
			continueBtn: false
		};
		this.login = this.login.bind(this);
	}
	login() {
		const { username, password } = this.state;
		axios
			.post('/auth/login', { username, password })
			.then((res) => {
				this.props.loginUser(res.data);
				this.props.history.push('/home');
			})
			.catch((err) => alert('Username or Password is incorrect. Try again Foo'));
	}
	register() {
		const { username, password, profilePic } = this.state;
		axios
			.post('/auth/register', { username, password, profilePic })
			.then((res) => {
				this.props.loginUser(res.data);
				this.props.history.push('/home');
			})
			.catch((err) => alert(err));
	}

	continueToggle() {
		const { continueBtn } = this.state;
		this.setState({ continueBtn: !continueBtn });
	}
	usernameChange(username) {
		this.setState({ username: username.target.value });
	}
	passwordChange(password) {
		this.setState({ password: password.target.value });
	}
	render() {
		const { continueBtn } = this.state;
		console.log(this.props);
		return (
			<div>
				{continueBtn ? (
					<form className="login-box">
						<h1>Landing</h1>
						<input
							className="username-inp"
							placeholder="username"
							onChange={(username) => this.usernameChange(username)}
						/>
						<input
							className="password-inp"
							placeholder="password"
							type="password"
							onChange={(password) => this.passwordChange(password)}
						/>
						<button className="login-btn" onClick={() => this.login()}>
							Login
						</button>
						<button className="reg-btn" onClick={() => this.register()}> 
							Register
						</button>
					</form>
				) : (
					<div>
						<h1>MAKE YOUR DREAMS A REALITY</h1>
						<button onClick={() => this.continueToggle()}>CONTINUE</button>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchStateProps = { loginUser };

export default connect(mapStateToProps, dispatchStateProps)(Landing);
