import React, { Component } from 'react';
import './Ask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default class Ask extends Component {
	constructor() {
		super();
		this.state = {
			asking: false,
			sent: false,
			question: '',
			message: ''
		};
	}
	sentToggle(){
		this.setState({
			sent: false
		})
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
	askQuestion() {
		const { question, message } = this.state;
		axios.post('/api/question', { question, message }).then(res => {
			this.setState({
				sent: true,
				asking: false
			})
		}).catch(err => console.log(err))
	}
	render() {
		const { asking, sent } = this.state;
		return (
			<div className="ask">
				<Alert className="text-center" isOpen={sent} toggle={() => this.sentToggle()} color="success">Question Sent!</Alert>
				{!asking ? (
					<div id="title">
						<h1 className="text-center">Lucid Dreaming Experts</h1>
						<div className="experts">
							<div id="expert1">
								<img
									id="caden"
									src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/91271804_10217020187160808_1540779750337806336_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=1dz1YChhIdoAX8AXgQN&_nc_ht=scontent-sjc3-1.xx&oh=7ef888678db538bf0cf10bfcd01b59e5&oe=5F1C12C4"
								/>
								<Label size="lg" id="exp1-label" for="caden">
									Caden
								</Label>
							</div>
							<div id="expert2">
								<img
									id="harambe"
									src="https://compote.slate.com/images/15b374a7-e5e3-4e66-99ba-932d4d060739.jpg"
								/>
								<Label size="lg" id="exp2-label" for="harambe">
									Harambe
								</Label>
							</div>
							<div id="expert3">
								<img
									id="joe"
									src="https://pbs.twimg.com/profile_images/378800000347123596/96fb92fe5fcbb11bff9a38fec1b99dcc_400x400.png"
								/>
								<Label size="lg" id="exp3-label" for="joe">
									Cotton-Eye-Joe
								</Label>
							</div>
							<div className="btn-div">
								<Button size="lg" color="info" id="ask-btn" onClick={() => this.askingToggle()}>
									Submit a Question
								</Button>
							</div>
						</div>
					</div>
				) : (
					<div>
						<Form className="question-form">
							<FormGroup>
								<Label size="lg" for="question">
									Ask Your Burning Questions Here
								</Label>
								<Input
									id="question"
									onChange={(question) => this.questionChange(question)}
									placeholder="What questions can our experts help you with..."
								/>
							</FormGroup>

							<Input
								type="textarea"
								id="message"
								onChange={(message) => this.messageChange(message)}
								placeholder="Any additional information (optional)..."
							/>
							<Button block color="success" onClick={() => this.askQuestion()}>Submit Question</Button>
							<Button block color="danger" id="cancel-btn" onClick={() => this.askingToggle()}>
								Cancel
							</Button>
						</Form>
						<div className="experts">
							<div id="expert1">
								<img
									id="caden"
									src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/91271804_10217020187160808_1540779750337806336_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=1dz1YChhIdoAX8AXgQN&_nc_ht=scontent-sjc3-1.xx&oh=7ef888678db538bf0cf10bfcd01b59e5&oe=5F1C12C4"
								/>
								<Label size="lg" id="exp1-label" for="caden">
									Caden
								</Label>
							</div>
							<div id="expert2">
								<img
									id="harambe"
									src="https://compote.slate.com/images/15b374a7-e5e3-4e66-99ba-932d4d060739.jpg"
								/>
								<Label size="lg" id="exp2-label" for="harambe">
									Harambe
								</Label>
							</div>
							<div id="expert3">
								<img
									id="joe"
									src="https://pbs.twimg.com/profile_images/378800000347123596/96fb92fe5fcbb11bff9a38fec1b99dcc_400x400.png"
								/>
								<Label size="lg" id="exp3-label" for="joe">
									Cotton-Eye-Joe
								</Label>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
