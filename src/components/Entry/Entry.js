import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Entry.css';

class Entry extends Component {
	constructor() {
		super();
		this.state = {
			entry: '',
		};
	}
	componentDidMount() {
		if (this.props.location.pathname === `/entry/${this.props.match.params.journalid}`) {
			axios
				.get(`/api/entry/${this.props.match.params.journalid}`)
				.then((res) => {
					console.log(res.data)
					this.setState({ entry: res.data });
				})
				.catch((err) => console.log(err));
		}
	}
	render() {


		return (
			<div className="open-journal">
				<div className="l-pg">
					{/* <h1 id="l-title">{entry.title}</h1>
					<h1 id="l-date"> {entry.date} </h1> */}
				</div>

				<div className="r-pg">
					<h1 id="r-title" />
					<h1 id="r-date" />
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Entry);
