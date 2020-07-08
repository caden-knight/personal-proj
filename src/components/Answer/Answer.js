import React from 'react';
import './Answer.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Answer extends React.Component {
	constructor() {
		super();
		this.state = {
			questions: [],
			question: null,
			answerQuestion: false,
			answer: '',
			answered: false,
			error: false
		};
	}
	componentDidMount() {
		axios.get('/api/questions').then((res) => {
			this.setState({
				questions: res.data
			});
		});
	}
	errorToggle() {
		this.setState({error: false})
	}
	answeredToggle() {
		this.setState({ answered: false });
	}
	answerToggle(questionid) {
		const { answerQuestion } = this.state;
		this.setState({ answerQuestion: !answerQuestion })
		if (!answerQuestion) {
			this.componentDidMount();
		}
		if (questionid) {
			console.log(questionid);
			axios
				.get(`/api/question/${questionid}`)
				.then((res) => {
					this.setState({ question: res.data });
					this.componentDidMount();
				})
				.catch((err) => {
					console.log(err)
					this.setState({error: true})
				});
		}
	}
	answerChange(answer) {
		this.setState({ answer: answer.target.value });
	}
	answer(questionid) {
		const { answer } = this.state;
		axios.put(`/api/answer/${questionid}`, { answer }).then((res) => {
			this.setState({answered: true});
			this.answerToggle();
			this.componentDidMount();
		});
	}

	render() {
		const { questions, answered, question, error } = this.state;	

		const { answerQuestion } = this.state;
		const unansweredQuestions = questions.map((question) => {
			if (!question.answered) {
				console.log(question.id);
				return (
					<Col className="all-them-questions" key={question.id} sm="7">
						<Card className="question-card" body>
							<CardTitle>
								<h3 id="asked-header">Asked on</h3>
								<p id="asked-date">{question.date}</p>
								<br />
								<h3 id="author-header" >By</h3>
								<p id="question-author">{question.username}</p>
							</CardTitle>
							<hr />
							<CardText />
							<h4 id="question-title">Question</h4>
							<p id="question">{question.question}</p>
							<h4 id="question-title">Message</h4>
							<p id="question-msg">{question.message}</p>
							<Button
								outline
								color="success"
								onClick={() => this.answerToggle(question.id)}
								id="answer-btn"
							>
								Answer Question
							</Button>
						</Card>
					</Col>
				);
			}
		});	
		return (
			<div className="questions">
				<Alert isOpen={answered} color="success" toggle={() => this.answeredToggle()} fade={true}>Question has been answered! An email has been sent to the user notifying them of your answer.</Alert>
				<Alert isOpen={error} color="danger" toggle={() => this.errorToggle()} fade={true}>You're Question was unable to be sent!</Alert>
				{!answerQuestion ? (
					<div className="all-questions">
					<h2 className="text-center" id="unanswered">
						Unanswered Questions
					</h2>
						<Row>{unansweredQuestions}</Row>
						</div>
				) : null}
				{answerQuestion && question ? (
					<div>
						<h2 className="text-center" id="unanswered">
						Unanswered Questions
					</h2>
						<Row>{unansweredQuestions}</Row>
						<div className="modal">
					<Modal className="answer-box" isOpen={answerQuestion}>
						<ModalHeader>
							Question: {question.question} 
							<hr />
							Message: {question.message}
							 </ModalHeader>
						<ModalBody>
							<Input
								onChange={(answer) => this.answerChange(answer)}
								type="textarea"
								placeholder="Write your best answer in here or else..."
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={() => this.answerToggle()} >
						Cancel
					</Button>
							<Button color="success" onClick={() => this.answer(question.id)}>Send Answer</Button>
						</ModalFooter>
					</Modal>
					</div>
				</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Answer);
