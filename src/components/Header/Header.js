import React from 'react';
import { loginUser, logout } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	Navbar,
	NavbarToggler,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	UncontrolledDropdown,
	Collapse,
	NavbarBrand,
	Nav,
	NavLink,
	Button,
	NavItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moon from '../../pics/moon.png';
import axios from 'axios';
import './Header.css';

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			menu: false,
			menuOpen: false
		};
	}
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
	menuToggle() {
		const { menuOpen } = this.state;
		this.setState({ menuOpen: !menuOpen });
	}

	render() {
		const { menuOpen } = this.state;
		return (
			<div className="headers">
				{!this.props.isAdmin ? (
					<Navbar color="light" light expand="md" className="user-nav">
						<NavbarBrand href="#home">
							<img src={moon} id="moon-pic" width="50" height="50" alt="moon-pic" />
							Lucidography
						</NavbarBrand>
						<NavbarToggler onClick={() => this.menuToggle()} />
						<Collapse isOpen={menuOpen} navbar>
							<Nav className="mr-auto" navbar>
								<NavItem>
									<NavLink href="#home">Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#about">About </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#ask">Ask </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#posts">Posts </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#journal">Dream Journal </NavLink>
								</NavItem>
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
						</Collapse>
					</Navbar>
				) : (
					<Navbar color="dark" dark expand="md" className="admin-nav">
						<NavbarBrand href="#home">
							<img src={moon} id="moon-pic" width="50" height="50" alt="moon-pic" />
							Lucidography
						</NavbarBrand>
						<NavbarToggler onClick={() => this.menuToggle()} />
						<Collapse isOpen={menuOpen} navbar>
							<Nav className="mr-auto" navbar>
								<NavItem>
									<NavLink href="#home">Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#about">About </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#ask">Ask </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#posts">Posts </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#journal">Dream Journal </NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#questions">Answer Questions</NavLink>
								</NavItem>
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
						</Collapse>
					</Navbar>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchToProps = { loginUser, logout };

export default withRouter(connect(mapStateToProps, dispatchToProps)(Header));
