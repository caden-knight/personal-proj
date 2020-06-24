import React, { Component, useEffect } from 'react';
import routes from './routes';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import Axios from 'axios'
import {loginUser} from './ducks/reducer'
import './App.css';

function App(props) {
	useEffect(() => {
			Axios.get('/auth/user').then(res => {
				props.loginUser(res.data)
			})
		
	
	}, []) 

	console.log(props.isLoggedIn);
	return (
		<div className="routes">
			{!props.isLoggedIn ? (
				<div>{routes}</div>
			) : (
				<div>
					<Header /> {routes}
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {loginUser})(App);
