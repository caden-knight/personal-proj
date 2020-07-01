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
			rightEditing: false,
			left: 1,
			right: 2,
			newLucid: false,
			newTitle: '',
			newContent: '',
			newDreamSigns: ''
		};
	}
	componentDidMount() {
		// this.setState({
		// 	left: 1,
		// 	right: 2
		// });
		axios.get('/api/user_entries').then((res) => {
			this.setState({ userEntries: res.data });
		});
		this.state.userEntries.sort((a, b) => b.id - a.id);
	}
	leftEditToggle() {
		this.setState({ leftEditing: !this.state.leftEditing });
	}
	rightEditToggle() {
		this.setState({ rightEditing: !this.state.rightEditing });
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
	editLucid() {
		this.setState({ newLucid: !this.state.newLucid });
	}
	editTitle(title) {
		this.setState({ newTitle: title.target.value });
	}
	editContent(content) {
		this.setState({ newContent: content.target.value });
	}
	editDreamSigns(signs) {
		this.setState({ newDreamSigns: signs.target.value });
	}
	editEntryRight(lucid, title, content, dreamSigns, entryid) {
		const { userEntries, right } = this.state;
		const rightEntry = userEntries[right - 1];
		axios.put(`/api/entry/${rightEntry.id}`, { lucid, title, content, dreamSigns, entryid }).then((res) => {
			this.componentDidMount();
			this.rightEditToggle();
		});
	}
	editEntryLeft(lucid, title, content, dreamSigns, entryid) {
		const { userEntries, left } = this.state;
		const leftEntry = userEntries[left - 1];
		axios.put(`/api/entry/${leftEntry.id}`, { lucid, title, content, dreamSigns, entryid }).then((res) => {
			this.componentDidMount();
			this.leftEditToggle();
		});
	}
	deleteEntry() {
		const {left, right, userEntries} = this.state
		
	}
	render() {
		const {
			newLucid,
			newTitle,
			newContent,
			newDreamSigns,
			userEntries,
			leftEditing,
			rightEditing,
			right,
			left
		} = this.state;
		userEntries.sort((a, b) => b.id - a.id);
		const leftEntry = userEntries[left - 1];
		const rightEntry = userEntries[right - 1];
		console.log('left', leftEntry);
		console.log('right', rightEntry);
		console.log(userEntries);
		console.log(this.state);
		return (
			<div className="window">
				<button onClick={() => this.props.next()}>back to title</button>
				<div className="open-journal">
					<div id="middle-strip" />
					{leftEntry ? (
						<div className="l-pg">
							<h2 id="l-pg-num">{`${left}`}</h2>
							<h1 id="l-title">{leftEntry.title}</h1>
							<h1 id="l-date"> {leftEntry.date} </h1>
							<p>{leftEntry.content}</p>
							<h3> {leftEntry.dreamSigns} </h3>
							<button onClick={() => this.pageDec()}>flip back</button>
							<button id="left-edit" onClick={() => this.leftEditToggle()}>
								Edit Page
							</button>
						</div>
					) : (
						<div className="l-pg" />
					)}
					{leftEntry && leftEditing ? (
						<form className="edit-form">
							<input
								id="new-title"
								onChange={(title) => this.editTitle(title)}
								defaultValue={leftEntry.title}
							/>
							<div className="new-lucidity">
								<label htmlFor="new-lucid">Lucidity</label>
								<input onClick={() => this.editLucid()} id="new-lucid" type="checkbox" />
							</div>
							<textarea
								id="new-content"
								onChange={(content) => this.editContent(content)}
								defaultValue={leftEntry.content}
							/>
							<input
								onChange={(signs) => this.editDreamSigns(signs)}
								id="new-dream-signs"
								defaultValue={leftEntry.dreamSigns}
							/>
							<button
								id="edit-submit"
								onClick={() =>
									this.editEntryLeft(newLucid, newTitle, newContent, newDreamSigns, leftEntry.id)}
							>
								Complete
							</button>
							<button id="cancel-btn" onClick={() => this.leftEditToggle()}>
								Nevermind
							</button>
						</form>
					) : null}

					{rightEntry ? (
						<div id="r-pg">
							<h1 id="r-pg-num">{`${right}`}</h1>
							<h1 id="r-title"> {rightEntry.title} </h1>
							<h1 id="r-date"> {rightEntry.date} </h1>
							<p> {rightEntry.content} </p>
							<button onClick={() => this.rightEditToggle()} id="edit-btn">
								Edit Page
							</button>
							<button onClick={() => this.pageInc()}>flip page</button>
						</div>
					) : (
						<div id="r-pg" />
					)}
					{rightEntry && rightEditing ? (
						<form className="edit-form">
							<input
								id="new-title"
								onChange={(title) => this.editTitle(title)}
								defaultValue={rightEntry.title}
							/>
							<div className="new-lucidity">
								<label htmlFor="new-lucid">Lucidity</label>
								<input onClick={() => this.editLucid()} id="new-lucid" type="checkbox" />
							</div>
							<textarea
								id="new-content"
								onChange={(content) => this.editContent(content)}
								defaultValue={rightEntry.content}
							/>
							<input
								onChange={(signs) => this.editDreamSigns(signs)}
								id="new-dream-signs"
								defaultValue={rightEntry.dreamSigns}
							/>
							<button
								id="edit-submit"
								onClick={() =>
									this.editEntryRight(newLucid, newTitle, newContent, newDreamSigns, rightEntry.id)}
							>
								Complete
							</button>
							<button id="cancel-btn" onClick={() => this.rightEditToggle()}>
								Nevermind
							</button>
						</form>
					) : null}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Entry);
