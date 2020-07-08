import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserData from '../UserData/UserData';
import './Home.css'
function Home(props) {
	return (
		<div className="welcome-user">
			<Jumbotron>
				<h1 id="home-title" className="display-3">Welcome, {props.username}</h1>
				<p className="lead">
				</p>
				<p className="lead">
					<Button id="about-btn" color="primary" href="#about">
						Learn more!
					</Button>
				</p>
				<UserData />
			</Jumbotron>
		</div>
	);
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Home);
