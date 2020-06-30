import React, { Component } from 'react';
import './Landing.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';
import {withRouter} from 'react-router-dom'

class Landing extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			profilePic: '',
			continueBtn: false
		};
	}
	login() {
		const { username, password } = this.state;
		axios
			.post('/auth/login', { username, password })
			.then((res) => {
				this.props.loginUser(res.data);
				this.props.history.push('/home');
			})
			.catch((err) => alert('Username or Password is incorrect. Try again Foo', err));
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
		return (
			<div className="Landing">
				{continueBtn ? (
					<div className="login-box">
					<form className="login">
						<h1 id="login-prompt">Login</h1>
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
					</div>
				) : (
					<div className="welcome">
						<h1>MAKE YOUR DREAMS A REALITY</h1>
						<button id="continue-btn" onClick={() => this.continueToggle()}>CONTINUE</button>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchStateProps = { loginUser };

export default withRouter(connect(mapStateToProps, dispatchStateProps)(Landing));
