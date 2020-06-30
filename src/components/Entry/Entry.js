import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Entry.css';

class Entry extends Component {
	constructor() {
		super();
		this.state = {
			userEntries: [],
			leftEditing: false,
			left: 1,
			right: 2,
			newLucid: false,
			newTitle: '',
			newContent: '',
			newDreamSigns: ''
		};
	}
	componentDidMount() {
		axios.get('/api/user_entries').then((res) => {
			this.setState({ userEntries: res.data });
		});
	}
	leftEditToggle() {
		this.setState({ leftEditing: !this.state.leftEditing });
	}
	pageInc() {
		let { right } = this.state;
		let { left } = this.state;
		const { userEntries } = this.state;
		let pageCount = userEntries.length;
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
		let { left } = this.state;
		if (right && left > 1) {
			this.setState({
				right: right - 2,
				left: left - 2
			});
			console.log(right, left);
		}
	}
	editEntryRight() {
		const { userEntries } = this.state;
		const { right } = this.state;
		const rightEntry = userEntries[right - 1];
		const { newLucid, newTitle, newContent, newDreamSigns } = this.state;
		axios.put(`/api/entry/${rightEntry.id}`, { newLucid, newTitle, newContent, newDreamSigns });
	}
	render() {
		const { userEntries } = this.state;
		const { leftEditing } = this.state;
		const { right } = this.state;
		const { left } = this.state;
		const leftEntry = userEntries[left - 1];
		const rightEntry = userEntries[right - 1];
		console.log(leftEntry);

		return (
			<div className="window">
				<button onClick={() => this.props.next()}>back to title</button>
				<button onClick={() => this.pageDec()}>flip back</button>
				<div className="open-journal">
					<div id="middle-strip" />
					{leftEntry ? (
						<div className="l-pg">
							<h1 id="l-title">{leftEntry.title}</h1>
							<h1 id="l-date"> {leftEntry.date} </h1>
							<h2 id="l-pg-num">{`${left}`}</h2>
							<p>{leftEntry.content}</p>
							<button id="left-edit" onClick={() => this.leftEditToggle()}>
								Edit Page
							</button>
						</div>
					) : (
						<div className="l-pg" />
					)}
					{leftEntry && leftEditing ? (
						<form className="edit-form">
							<input id="new-title" defaultValue={leftEntry.title} />
							<div className="new-lucidity">
								<label htmlFor="new-lucid">Lucidity</label>
								<input id="new-lucid" type="checkbox" />
							</div>
						</form>
					) : null}

					{rightEntry ? (
						<div id="r-pg">
							<h1 id="r-pg-num">{`${right}`}</h1>
							<h1 id="r-title"> {rightEntry.title} </h1>
							<h1 id="r-date"> {rightEntry.date} </h1>
							<p> {rightEntry.content} </p>
							<button onClick={() => this.editing} id="edit-btn">
								Edit Entry
							</button>
							<button onClick={() => this.pageInc()}>flip page</button>
							<h1 id="r-date" />
						</div>
					) : (
						<div id="r-pg" />
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Entry);
