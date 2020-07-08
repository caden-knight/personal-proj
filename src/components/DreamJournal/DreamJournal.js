import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Form, Input, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './DreamJournal.css';
import Entry from '../Entry/Entry';

class DreamJournal extends Component {
	constructor() {
		super();
		this.state = {
			entries: [],
			creating: false,
			title: '',
			content: '',
			date: '',
			dreamSigns: '',
			lucid: false,
			next: false,
			entryDone: true
		};
		this.nextToggle = this.nextToggle.bind(this);
	}
	componentDidMount() {
		axios
			.get('/api/user_entries')
			.then((res) => {
				this.setState({ entries: res.data });
			})
			.catch((err) => console.log(err));
	}
	entryDoneToggle() {
		this.setState({ entryDone: !this.state.entryDone });
	}
	nextToggle() {
		const { next } = this.state;
		this.setState({ next: !next });
		if (next) {
			this.componentDidMount();
		}
	}
	creatingToggle() {
		const { creating } = this.state;
		this.setState({ creating: !creating });
	}
	lucidToggle() {
		const { lucid } = this.state;

		this.setState({ lucid: !lucid });
	}
	title(title) {
		this.setState({ title: title.target.value });
	}
	date(date) {
		this.setState({ date: date.target.value });
	}
	content(content) {
		this.setState({ content: content.target.value });
	}
	dreamSigns(signs) {
		this.setState({ dreamSigns: signs.target.value });
	}
	addEntry() {
		const id = this.props.userId;
		const { title, lucid, date, content, dreamSigns } = this.state;
		axios
			.post('/api/entry', { lucid, title, content, dreamSigns, date, id })
			.then((res) => {
				this.setState({ entries: res.data });
				this.creatingToggle();
				this.componentDidMount();
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { entries, creating, entryDone } = this.state;
		const allEntries = entries.map((entry) => {
			return (
				<div key={entry.id}>
					<Link to={`/entry/${entry.id}`}>{entry.title}</Link>
					<span> {entry.date} </span>
				</div>
			);
		});
		return (
			<div className="parent">
				{creating && !this.state.next ? (
					//Add a New Entry Form
					<Form className="new-entry">
						<FormGroup>
							<Label for="title">Create a title for your entry</Label>
							<Input
								id="title"
								placeholder="Title Your Dream..."
								onChange={(title) => this.title(title)}
							/>
						</FormGroup>
						<FormGroup>
							<Label id="lucid-label" for="lucid">
								Was it Lucid?
							</Label>
							<Input type="checkbox" id="lucidCheck" onClick={() => this.lucidToggle()} />
						</FormGroup>
						<FormGroup>
							<Label for="date">Date you had the dream</Label>
							<Input
								type="date"
								id="date"
								placeholder="When did you have the dream..."
								onChange={(date) => this.date(date)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="content">Describe the dream</Label>
							<Input
								type="textarea"
								id="content"
								placeholder="Write about your dream..."
								onChange={(content) => this.content(content)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="dream-signs">Notice any patterns?</Label>
							<Input
								type="textarea"
								id="dream-signs"
								placeholder="Any recurring themes..."
								onChange={(signs) => this.dreamSigns(signs)}
							/>
						</FormGroup>
						<Button color="danger" id="cancel-btn" onClick={() => this.creatingToggle()}>
							Cancel
						</Button>
						<Button color="warning" className="float-right" id="record-btn" onClick={() => this.addEntry()}>
							Record My Dream!
						</Button>
					</Form>
				) : null}
				{!this.state.next && !creating ? (
					<div>
						<div className="journal-div">
							<div className="journal">
								<Button id="create-btn" onClick={() => this.creatingToggle()}>
									Record a Dream
								</Button>
								<Button className="float-right" onClick={() => this.nextToggle()}>
									Next
								</Button>
								<h1 className="journal-title">{this.props.username}'s Dream Journal</h1>
							</div>
							<div className="pages" />
							<div className="contents">
								<h1 className="toc">Table of Contents</h1>
								<h5 className="title"> {allEntries} </h5>
							</div>
						</div>
					</div>
				) : (
					<Entry next={this.nextToggle} />
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(DreamJournal);
