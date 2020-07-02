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
					<Form className="reg-form">
						<h1 id="reg-prompt">Sign Up</h1>
						<FormGroup>

						<Label for='reg-email'>Choose an Email</Label>
						<Input
							id="reg-email"
							type="email"
							placeholder="Email..."
							onChange={(email) => this.emailChange(email)}
							/>
							</FormGroup>
							<FormGroup>

							<Label for="reg-username">Create a Username</Label>
						<Input
							className="reg-username"
							placeholder="Username..."
							onChange={(username) => this.usernameChange(username)}
							/>
							</FormGroup>
							<FormGroup>

							<Label for="profile-pic">Choose a profile picture</Label>
						<Input
							id="profile-pic"
							placeholder="Copy an image address and paste it here..."
							onChange={(profilePic) => this.profilePicChange(profilePic)}
							/>
							</FormGroup>
							<FormGroup>

							<Label for="reg-password">Create a password</Label>
						<Input
							className="reg-password"
							placeholder="Create a password..."
							type="password"
							onChange={(password) => this.passwordChange(password)}
							/>
							</FormGroup>
						<Button id="reg-cancel" onClick={() => this.registerToggle()}>
							Back to Login
						</Button>
						<Button className="float-right" color="success" className="reg-acct" onClick={() => this.register()}>
							Register Account
						</Button>
					</Form>
				) : null}
				{!continueBtn ? (
					<div className="land-msg">
						<h1 id="dream-msg" className="text-center">MAKE YOUR DREAMS A REALITY</h1>
						<Button color="info" size="lg" id="continue-btn" onClick={() => this.continueToggle()}>
							CONTINUE
						</Button>
					</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchStateProps = { loginUser };

export default withRouter(connect(mapStateToProps, dispatchStateProps)(Landing));
