import React, { Component } from 'react';
import './SingleEntry.css'
import axios from 'axios';

export default class SingleEntry extends Component {
	constructor() {
		super();
		this.state = {
			entry: ''
		};
	}
	componentDidMount() {
		axios
			.get(`/api/entry/${this.props.match.params.journalid}`)
			.then((res) => {
				this.setState({ entry: res.data });
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { entry } = this.state;
		console.log(this.props.match.params.journalid);
		return (
			<div className="entry-page">
				<h1 id="title">{entry.title}</h1>
				<h2 id="date"> {entry.date} </h2>
				<p id="content">{entry.content}</p>
			</div>
		);
	}
}
