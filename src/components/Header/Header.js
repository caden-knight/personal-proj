import React from 'react';
import { loginUser, logout } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavLink, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moon from '../../pics/moon.png'
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
					<Navbar color="light" className="user-nav">
							<NavbarBrand href="#home">
							<img
							src={moon}
							id="moon-pic"
							width="50"
							height="50"
							alt="moon-pic"
							/>
							Lucidography
						</NavbarBrand>
						<Nav>
							<NavLink href="#home">Home</NavLink>
							<NavLink href="#about">About </NavLink>
							<NavLink href="#ask">Ask </NavLink>
							<NavLink href="#posts">Posts </NavLink>
							<NavLink href="#journal">Dream Journal </NavLink>
						</Nav>
						<Nav>
							<div className="user-info">
								<img className="prof-pic" src={this.props.profilePic} alt="profile pic" />
							</div>
							<Button
								color="danger"
								onClick={() => {
									this.logout();
								}}
							>
								Logout
							</Button>
						</Nav>
					</Navbar>
				) : (
						<Navbar color="dark" dark expand="md" className="admin-nav">
							<NavbarBrand href="#home">
							<img
							src={moon}
							id="moon-pic"
							width="50"
							height="50"
							alt="moon-pic"
							/>
							Lucidography
						</NavbarBrand>
						<Nav>
							<NavLink href="#home">Home</NavLink>
							<NavLink href="#about">About </NavLink>
							<NavLink href="#ask">Ask </NavLink>
							<NavLink href="#posts">Posts </NavLink>
							<NavLink href="#journal">Dream Journal </NavLink>
							<NavLink href="#questions">Answer Questions</NavLink>
						</Nav>
						<Nav>
							<div className="user-info">
								<img className="prof-pic" src={this.props.profilePic} alt="profile pic" />
							</div>
							<Button
								color="danger"
								onClick={() => {
									this.logout();
								}}
							>
								Logout
							</Button>
						</Nav>
					</Navbar>					
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchToProps = { loginUser, logout };

export default withRouter(connect(mapStateToProps, dispatchToProps)(Header));
