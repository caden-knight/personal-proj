import React, { useEffect } from 'react';
import routes from './routes';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import Axios from 'axios';
import { loginUser } from './ducks/reducer';
import Landing from './components/Landing/Landing';
import { withRouter } from 'react-router-dom';
import './App.css';

function App(props) {
	useEffect(() => {
		console.log(props);
		Axios.get('/auth/user').then((res) => {
			props.loginUser(res.data);
		}).catch(err => console.log('Not logged in'));
	}, []);
	return (
		<div className="routes">
			{!props.isLoggedIn ? (
				<div>
					<Landing />
				</div>
			) : (
				<div>
					<Header /> {routes}
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => state;
export default withRouter(connect(mapStateToProps, { loginUser })(App));
