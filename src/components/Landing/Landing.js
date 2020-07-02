import React, { Component } from 'react';
import './Landing.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class Landing extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			profilePic: '',
			email: '',
			continueBtn: false,
			register: false,
			error: false
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
			.catch((err) => {
				this.setState({error: true})
			});
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
				this.setState({error: false})
			})
			.catch((err) => <Alert>Username or email is already in use</Alert>);
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
		const { continueBtn, register, error } = this.state;
		return (
			<div className="Landing">
				<Alert color="danger" isOpen={error}>Username or password is incorrect. Try again fool.</Alert>
				{continueBtn && !register ? (
					<Form className="login-form">
						<h1 id="name">Lucidography </h1>
						<h2 id="welcome">Welcome</h2>

						<FormGroup>
							<Label>Username</Label>
							<Input
								// className="username-inp"
								label="Username"
								placeholder="username"
								onChange={(username) => this.usernameChange(username)}
							/>
							<Label>Password</Label>
							<Input
								// className="password-inp"
								placeholder="password"
								type="password"
								onChange={(password) => this.passwordChange(password)}
							/>
						</FormGroup>
						<Button block type="submit" color="success" id="login-btn" onClick={() => this.login()}>
							Login
						</Button>
						<Button block className="reg-btn" onClick={() => this.registerToggle()}>
							Sign-up
						</Button>
					</Form>
				) : null}
				{continueBtn && register ? (
					<form className="reg-form">
						<h1 id="reg-prompt">Sign Up</h1>
						<input
							id="reg-email"
							type="email"
							placeholder="Email..."
							onChange={(email) => this.emailChange(email)}
						/>
						<input
							className="reg-username"
							placeholder="Choose a username..."
							onChange={(username) => this.usernameChange(username)}
						/>
						<input
							id="profile-pic"
							placeholder="Copy image address and paste it here..."
							onChange={(profilePic) => this.profilePicChange(profilePic)}
						/>
						<input
							className="reg-password"
							placeholder="Create a password..."
							type="password"
							onChange={(password) => this.passwordChange(password)}
						/>
						<button className="reg-acct" onClick={() => this.register()}>
							Register Account
						</button>
						<button id="reg-cancel" onClick={() => this.registerToggle()}>
							Back to Login
						</button>
					</form>
				) : null}
				{!continueBtn ? (
					<div className="land-msg">
						<h1>MAKE YOUR DREAMS A REALITY</h1>
						<button id="continue-btn" onClick={() => this.continueToggle()}>
							CONTINUE
						</button>
					</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchStateProps = { loginUser };

export default withRouter(connect(mapStateToProps, dispatchStateProps)(Landing));
