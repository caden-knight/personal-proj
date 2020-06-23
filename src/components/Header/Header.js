import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Header extends React.Component {
	componentDidMount() {
		this.props.getUser()
	}
	render() {
		console.log(this.props)
		return (
			<div className="Links">
				<Link to="/home">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/ask">Ask</Link>
				<Link to="/posts">Posts</Link>
				<Link to="/journal">Dream Journal</Link>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
const dispatchToProps = {getUser}

export default connect(mapStateToProps, dispatchToProps)(Header);
