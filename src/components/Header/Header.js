import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser, logout } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

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
				this.props.history.push('/');
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="headers">
				{!this.props.isAdmin ? (
					<div className="user-hdr">
						<div className="user-info">
							<img className="prof-pic" src={this.props.profilePic} alt="profile pic" />
							<h1 className="username">{this.props.username}</h1>
						</div>
						<div className="links-header">
							<Link to="/home" id="home">
								Home
							</Link>
							<Link to="/about">About </Link>
							<Link to="/ask">Ask </Link>
							<Link to="/posts">Posts </Link>
							<Link to="/journal">Dream Journal </Link>
							<button
								onClick={() => {
									this.logout();
								}}
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div className="admin-hdr">
						<div className="user-info">
							<img className="prof-pic" src={this.props.profilePic} alt="profile pic" />
							<h1 className="username">{this.props.username}</h1>
						</div>
						<div className="links">
							<Link to="/home" id="home">
								Home
							</Link>
							<Link to="/about">About </Link>
							<Link to="/ask">Ask </Link>
							<Link to="/posts">Posts </Link>
							<Link to="/journal">Dream Journal </Link>
							<Link to='/questions'>Answer Questions</Link>
							<button
								onClick={() => {
									this.logout();
								}}
							>
								Logout
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchToProps = { loginUser, logout };

export default withRouter(connect(mapStateToProps, dispatchToProps)(Header));
