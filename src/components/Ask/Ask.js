import React, { Component } from 'react';
import './Ask.css';
import axios from 'axios';

export default class Ask extends Component {
	constructor() {
		super();
		this.state = {
			asking: false,
			question: '',
			message: ''
		};
	}
	askingToggle() {
		const { asking } = this.state;

		this.setState({ asking: !asking });
	}
	questionChange(question) {
		this.setState({ question: question.target.value });
	}
	messageChange(message) {
		this.setState({ message: message.target.value });
	}
	async askQuestion() {
		const { question, message } = this.state;
		const status = await axios.post('/api/question', { question, message });
		if (status.data === 'OK') {
			alert('Question Sent!');
			this.setState({ asking: false });
		}
	}
	render() {
		const { asking } = this.state;
		return (
			<div className="ask">
				{!asking ? (
					<div className="experts">
						<div id="expert1">
							<img
								id="caden"
								src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/91271804_10217020187160808_1540779750337806336_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=1dz1YChhIdoAX8AXgQN&_nc_ht=scontent-sjc3-1.xx&oh=7ef888678db538bf0cf10bfcd01b59e5&oe=5F1C12C4"
							/>
							<label id="exp1-label" htmlFor="caden">
								Caden
							</label>
						</div>
						<div id="expert2">
							<img
								id="harambe"
								src="https://compote.slate.com/images/15b374a7-e5e3-4e66-99ba-932d4d060739.jpg"
							/>
							<label id="exp2-label" htmlFor="expert2">
								Harambe
							</label>
						</div>
						<div id="expert3">
							<img
								id="joe"
								src="https://pbs.twimg.com/profile_images/378800000347123596/96fb92fe5fcbb11bff9a38fec1b99dcc_400x400.png"
							/>
							<label id="exp3-label" htmlFor="joe">
								Cotton-Eye-Joe
							</label>
						</div>
						<div className="btn-div">
							<button id="ask-btn" onClick={() => this.askingToggle()}>
								Submit a Question
							</button>
						</div>
					</div>
				) : (
					<form className="question-form">
						<input
							id="question"
							value={this.state.question}
							onChange={(question) => this.questionChange(question)}
							placeholder="What questions can our experts help you with..."
						/>

						<textarea
							id="message"
							value={this.state.message}
							onChange={(message) => this.messageChange(message)}
							placeholder="Any additional information (optional)..."
						/>
						<button onClick={() => this.askQuestion()}>Submit Question</button>
                        <button id="cancel-btn" onClick={() => this.askingToggle()}>Cancel</button>
					</form>
				)}
			</div>
		);
	}
}
