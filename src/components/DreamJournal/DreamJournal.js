import React, { Component } from 'react';
import axios from 'axios';
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
			next: false
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
	nextToggle() {
		const { next } = this.state;
		this.setState({ next: !next });
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
		const { entries } = this.state;
		const { creating } = this.state;
		const allEntries = entries.map((entry) => {
				return (
					<div key={entry.id}>
						<Link to={`/entry/${entry.id}`}>{entry.title}</Link>
						<span> {entry.date} </span>
					</div>
				);
		});
		console.log(entries);
		return (
			<div className="parent">
				{creating && !this.state.next ? (
					//Add a New Entry Form
					<form className="new-entry">
						<input id="title" placeholder="Title Your Dream..." onChange={(title) => this.title(title)} />
						<input type="checkbox" id="lucid" onClick={() => this.lucidToggle()} />
						<label id="lucid-label" htmlFor="lucid">
							Lucid Dream
						</label>

						<input
							type="date"
							id="date"
							placeholder="When did you have the dream..."
							onChange={(date) => this.date(date)}
						/>

						<textarea
							id="content"
							placeholder="What happened in your dream..."
							onChange={(content) => this.content(content)}
						/>
						<textarea
							id="dream-signs"
							placeholder="What patterns do you notice..."
							onChange={(signs) => this.dreamSigns(signs)}
						/>
						<button id="record-btn" onClick={() => this.addEntry()}>
							Record My Dream!
						</button>

						<button id="cancel-btn" onClick={() => this.creatingToggle()}>
							Cancel
						</button>
					</form>
				) : null}
				{!this.state.next && !creating ? (
					<div className="journal-div">
						<div className="journal">
							<h1 className="journal-title">{this.props.username}'s Dream Journal</h1>
						</div>
						<div className="pages" />
						<div className="contents">
							<h1 className="toc">Table of Contents</h1>
							<h2 className="title"> {allEntries} </h2>
						</div>
						<button id="create-btn" onClick={() => this.creatingToggle()}>
							Record a Dream
						</button>
						<button onClick={() => this.nextToggle()}>Next</button>
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
