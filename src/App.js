import React, { Component } from 'react';
import routes from './routes';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
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
export default connect(mapStateToProps)(App);
