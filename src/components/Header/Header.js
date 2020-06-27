import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser, logout } from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Header extends React.Component {
	componentDidMount() {
		axios
			.get('/auth/user')
			.then((res) => {
				this.props.loginUser(res.data);
			})
			.catch((err) => alert(err));
	}
	logout() {
		axios
			.delete('/auth/logout')
			.then((res) => {
				this.props.logout();
			})
			.catch((err) => console.log(err));
	}

	render() {
		console.log(this.props);
		return (
			<div className="Links">
				<Link to="/home">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/ask">Ask</Link>
				<Link to="/posts">Posts</Link>
				<Link to="/journal">Dream Journal</Link>
				<button
					onClick={() => {
						this.logout();
					}}
				>
					Logout
				</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchToProps = { loginUser, logout };

export default connect(mapStateToProps, dispatchToProps)(Header);
