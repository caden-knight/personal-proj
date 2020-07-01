import React from 'react';
import './Answer.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Answer extends React.Component {
	constructor() {
		super();
		this.state = {
			questions: [],
			question: null,
			answerQuestion: false,
			answer: ''
		};
	}
	componentDidMount() {
		axios.get('/api/questions').then((res) => {
			this.setState({ questions: res.data });
		});
	}
	async answerToggle(questionid) {
		const { answerQuestion } = this.state;
		const { questions } = this.state;
		this.setState({ answerQuestion: !answerQuestion });
		if (!answerQuestion) {
			this.componentDidMount();
		}
		if (questionid) {
			console.log(questionid);
			await axios
				.get(`/api/question/${questionid}`)
				.then((res) => {
					this.setState({ question: res.data });
					this.componentDidMount();
				})
				.catch((err) => console.log(err));
		}
	}
	answerChange(answer) {
		this.setState({ answer: answer.target.value });
    }
    answer(answer,) {
        axios.post()
    }

	render() {
		const { questions } = this.state;
		const { question } = this.state;
		console.log(this.state.question);
		console.log(questions);
		const { answerQuestion } = this.state;
		const unansweredQuestions = questions.map((question) => {
			if (!question.answered) {
				return (
					<div key={question.id} className="map-questions">
						<div className="q-title">
							<span id="id">Question-ID# {question.id} </span>
							<h2 id="asked">Asked on: {question.date}</h2>
							<Link to id="question">
								{' '}
								{question.question}{' '}
							</Link>
						</div>
						<div className="q-content">
							<h1 id="info">Additional Information</h1>
							<p id="message"> {question.message} </p>
						</div>
						<button onClick={() => this.answerToggle(question.id)} id="answer-btn">
							Answer Question
						</button>
					</div>
				);
			}
		});
		return (
			<div className="questions">
				{!answerQuestion ? (
					<ul id="unanswered">
						Unanswered Questions
						{unansweredQuestions}
					</ul>
				) : null}
				{question ? (
					<div className="answer-box">
						<div className="q-box">
                            <h2>Asked by: {question.username} on {question.date} </h2>
							<h1>Question: {question.question}</h1>
                            <p> {question.message} </p>
						</div>
						<form className="answer-form">
							<textarea onChange={(answer) => this.answerChange(answer)} id="answer-inp" />
                            <button onClick={() => this.answer()} id="answer-btn">Send Answer</button>
							<button onClick={() => this.answerToggle()} id="cancel-btn">
								Cancel
							</button>
						</form>
					</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Answer);
