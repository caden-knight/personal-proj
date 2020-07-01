import React, { Component } from 'react';
import './Landing.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			profilePic: '',
			email: '',
			continueBtn: false,
			register: false
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
	registerToggle() {
		const { register } = this.state;
		this.setState({ register: !register });
	}
	register() {
		const { email, username, password, profilePic } = this.state;
		axios
			.post('/auth/register', { email, username, password, profilePic })
			.then((res) => {
				this.props.loginUser(res.data);
				this.props.history.push('/home');
			})
			.catch((err) => alert('Username or email is already in use'));
	}
	continueToggle() {
		const { continueBtn } = this.state;
		this.setState({ continueBtn: !continueBtn });
	}
	emailChange(email) {
		this.setState({ email: email.target.value });
	}
	profilePicChange(profilePic) {
		this.setState({ profilePic: profilePic.target.value });
	}
	usernameChange(username) {
		this.setState({ username: username.target.value });
	}
	passwordChange(password) {
		this.setState({ password: password.target.value });
	}
	render() {
		const { continueBtn } = this.state;
		const { register } = this.state;
		return (
			<div className="Landing">
				{continueBtn && !register ? (
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
							<button className="reg-btn" onClick={() => this.registerToggle()}>
								Sign-up
							</button>
						</form>
					</div>
				) : (
					null
				)}
				{continueBtn && register ? (
					<form className="reg-form">
						<h1 id="reg-prompt">Sign Up</h1>
						<input
							id="reg-email"
							placeholder="email..."
							onChange={(email) => this.emailChange(email)}
						/>
						<input
							className="reg-username"
							placeholder="choose a username..."
							onChange={(username) => this.usernameChange(username)}
						/>
						<input
							id="profile-pic"
							placeholder="copy image address and paste it here..."
							onChange={(profilePic) => this.profilePicChange(profilePic)}
						/>
						<input
							className="reg-password"
							placeholder="create a password..."
							type="password"
							onChange={(password) => this.passwordChange(password)}
						/>
						<button className="reg-acct" onClick={() => this.register()}>
							Register Account
						</button>
						<button id="reg-cancel" onClick={() => this.registerToggle()}>Back to Login</button>
					</form>
				) : null}
				{!continueBtn ?
				<div className="welcome">
				<h1>MAKE YOUR DREAMS A REALITY</h1>
				<button id="continue-btn" onClick={() => this.continueToggle()}>
					CONTINUE
				</button>
			</div> : null }
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchStateProps = { loginUser };

export default withRouter(connect(mapStateToProps, dispatchStateProps)(Landing));
