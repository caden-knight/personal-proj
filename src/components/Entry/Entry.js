import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Entry.css';

class Entry extends Component {
	constructor() {
		super();
		this.state = {
			left: 1,
			right: 2,
			pageCount: 0,		
		};
	}
	componentDidMount() {		
		this.setState({ pageCount: this.props.entries.length });
	}
	pageInc() {
		let { right } = this.state;
		let {left} = this.state
		const { pageCount } = this.state;
		if (right || left <= pageCount) {
			this.setState({ 
				right: right + 2,
				left: left + 2
			});
			console.log(right, left);
		}
	}
	pageDec() {
		let { right } = this.state;
		let {left} = this.state
		if (right && left > 1) {
			this.setState({ 
				right: right - 2,
				left: left - 2
			});
			console.log(right, left);
		}
	}
	render() {
		const { entries } = this.props;
		const { right } = this.state;
		const {left} = this.state
		const {pageCount} = this.state
		console.log(entries);
		console.log(this.state.pageCount);
		const leftEntry = entries[left - 1] 
		const rightEntry = entries[right - 1]

		return (
			<div className="window">
					<button onClick={() => this.props.next()}>back to title</button>
					<button onClick={() => this.pageDec()}>back</button>
			<div className="open-journal">
				<div id="middle-strip"/>
				<div className="l-pg">
					<h1 id="l-title">{leftEntry.title}</h1>
					<h1 id="l-date"> {leftEntry.date} </h1>
					<h2 id="l-pg-num">{`${left}`}</h2>
					<p>{leftEntry.content}</p> 
				</div>

				{rightEntry ? <div id="r-pg">
					<h1 id="r-pg-num">{`${right}`}</h1>
					<h1 id="r-title"> {rightEntry.title} </h1>
					<h1 id='r-date'> {rightEntry.date} </h1>
					<p> {rightEntry.content} </p>
					<button onClick={() => this.pageInc()}>right</button>
					<h1 id="r-date" /> 
				</div> : <div id="r-pg" />}
			</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Entry);
