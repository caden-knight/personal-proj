import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Entry.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

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
			this.state.userEntries.sort((a, b) => b.id - a.id);
		}).catch(err => console.log(err));
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
	rightDelete() {
		const { userEntries, right } = this.state;
		const rightEntry = userEntries[right - 1];
		axios.delete(`/api/entry/${rightEntry.id}`).then((res) => {
			alert('right Post deleted');
			this.componentDidMount();
		});
	}
	leftDelete() {
		const { userEntries, left } = this.state;
		const leftEntry = userEntries[left - 1];
		axios.delete(`/api/entry/${leftEntry.id}`).then((res) => {
			alert('left Post deleted');
			this.componentDidMount();
			console.log(userEntries, leftEntry)
		}).catch(err => console.log(err));
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
		return (
			<div className="window">
				<button onClick={() => this.props.next()}>back to title</button>
				<div className="open-journal">
					<div id="middle-strip" />
					{leftEntry ? (
						<div className="l-pg">
							<ButtonGroup className="journal-btns">
								<Button color="primary" onClick={() => this.pageDec()}>
									flip back
								</Button>
								<Button color="warning" id="left-edit" onClick={() => this.leftEditToggle()}>
									Edit Page
								</Button>
								<Button color="danger" onClick={() => this.leftDelete()} id="l-del">
									Delete Entry
								</Button>
							</ButtonGroup>
							<h4 id="l-pg-num">{`${left}`}</h4>
							<h3 id="l-title">{leftEntry.title}</h3>
							<h4 id="l-date"> {leftEntry.date} </h4>
							<h5>{leftEntry.content}</h5>
							<h3> {leftEntry.dreamSigns} </h3>
						</div>
					) : (
						<div className="l-pg">
						<Button color="primary" onClick={() => this.pageDec()}>
									flip back
								</Button>
								</div>
								
					)}
					{leftEntry && leftEditing ? (
						<Form className="edit-form">
							<Input
								id="new-title"
								onChange={(title) => this.editTitle(title)}
								defaultValue={leftEntry.title}
							/>
							<FormGroup className="new-lucidity">
								<Label for="new-lucid">Lucidity</Label>
								<Input onClick={() => this.editLucid()} id="new-lucid" type="checkbox" />
							</FormGroup>
							<Input
								type="textarea"
								id="new-content"
								onChange={(content) => this.editContent(content)}
								defaultValue={leftEntry.content}
							/>
							<Input
								onChange={(signs) => this.editDreamSigns(signs)}
								id="new-dream-signs"
								defaultValue={leftEntry.dreamSigns}
							/>
							<Button
								color="success"
								id="edit-submit"
								onClick={() =>
									this.editEntryLeft(newLucid, newTitle, newContent, newDreamSigns, leftEntry.id)}
							>
								Complete
							</Button>
							<Button id="cancel-btn" onClick={() => this.leftEditToggle()}>
								Nevermind
							</Button>
						</Form>
					) : null}

					{rightEntry ? (
						<div id="r-pg">
							<ButtonGroup className="float-right" id="r-pg-btns">
								<Button color="danger" onClick={() => this.rightDelete()} id="r-del">
									Delete Entry
								</Button>
								<Button color="warning" onClick={() => this.rightEditToggle()} id="edit-btn">
									Edit Page
								</Button>
								<Button color="primary" onClick={() => this.pageInc()}>
									flip page
								</Button>
							</ButtonGroup>
							<h4 id="r-pg-num">{`${right}`}</h4>
							<h3 id="r-title"> {rightEntry.title} </h3>
							<h4 id="r-date"> {rightEntry.date} </h4>
							<h5> {rightEntry.content} </h5>
						</div>
					) : (
						<div id="r-pg" />
					)}
					{rightEntry && rightEditing ? (
						<Form className="edit-form">
							<Input
								id="new-title"
								onChange={(title) => this.editTitle(title)}
								defaultValue={rightEntry.title}
							/>
							<FormGroup className="new-lucidity">
								<Label for="new-lucid">Lucidity</Label>
								<Input onClick={() => this.editLucid()} id="new-lucid" type="checkbox" />
							</FormGroup>
							<Input
								type="textarea"
								id="new-content"
								onChange={(content) => this.editContent(content)}
								defaultValue={rightEntry.content}
							/>
							<Input
								onChange={(signs) => this.editDreamSigns(signs)}
								id="new-dream-signs"
								defaultValue={rightEntry.dreamSigns}
								placeholder="Dream Signs"
							/>
							<Button
								color="success"
								id="edit-submit"
								onClick={() =>
									this.editEntryRight(newLucid, newTitle, newContent, newDreamSigns, rightEntry.id)}
							>
								Complete
							</Button>
							<Button id="cancel-btn" onClick={() => this.rightEditToggle()}>
								Nevermind
							</Button>
						</Form>
					) : null}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Entry);
