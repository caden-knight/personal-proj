import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Form,
	Input,
	FormGroup,
	Label,
	Button,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Col
} from 'reactstrap';
import './Posts.css';

class Posts extends Component {
	_isMounted = false;
	constructor() {
		super();
		this.state = {
			posts: [],
			creatingNew: false,
			myPosts: false,
			title: '',
			content: ''
		};
	}
	componentDidMount() {
		this._isMounted = true;

		axios
			.get('/api/posts')
			.then((res) => {
				if (this._isMounted) {
					this.setState({ posts: res.data });
				}
			})
			.catch((err) => alert(err));
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	creatingToggle() {
		const { creatingNew } = this.state;
		this.setState({ creatingNew: !creatingNew });
	}
	myPostsToggle() {
		const { myPosts } = this.state;

		this.setState({ myPosts: !myPosts });
	}
	newPost() {
		const { title, content } = this.state;
		axios
			.post('/api/post', { title, content })
			.then((res) => {
				this.setState(res.data);
				this.creatingToggle();
				this.componentDidMount();
			})
			.catch((err) => console.log(err));
	}
	titleChange(title) {
		this.setState({ title: title.target.value });
	}
	contentChange(content) {
		this.setState({ content: content.target.value });
	}
	render() {
		const { posts, creatingNew } = this.state;
		posts.sort((a, b) => b.id - a.id);
		const allPosts = posts.map((post) => {
			return (
				<div className="post-cards">
							
					<ListGroupItem id="post-card" key={post.id}>
						<ListGroupItemHeading className="title" className="text-left">
							{post.title}
						</ListGroupItemHeading>
						<ListGroupItemText className="author">
							Posted on {post.date}
							<br />
							By {post.username}
							<hr />
							{post.content}
						</ListGroupItemText>
					</ListGroupItem>
				</div>
			);
		});

		return (
			<div className="top-div">
				{!creatingNew ? (
					<div className="post-view">
						<h1 className="text-center">The Lucid Community</h1>
						<h5 className="text-center">Don't be shy, say something!</h5>
						{/* <input onClick={() => this.myPostsToggle()} type="checkbox" id="my-posts" /> */}
						{/* <label htmlFor="my-posts">My Posts</label> */}
						<ListGroup className="posts">
						<Button
									color="success"
									id="new-btn"
									onClick={() => this.creatingToggle()}
								>
									New Post
								</Button>
							{allPosts}
						</ListGroup>
					</div>
				) : (
					<Form id="new-post">
						<h1 id="create-title">Create a Post</h1>
						<FormGroup>
							<Label for="title">Name Your Post</Label>
							<Input
								className="text-left"
								placeholder="Name your post"
								id="title"
								onChange={(title) => this.titleChange(title)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="content">Compose your Post</Label>
							<Input
								id="content"
								onChange={(content) => this.contentChange(content)}
								placeholder="Share your experiences or questions here"
								type="textarea"
							/>
						</FormGroup>
						<Button color="success" block onClick={() => this.newPost()} type="submit">
							Post
						</Button>
						<Button color="danger" block onClick={() => this.creatingToggle()}>
							Cancel
						</Button>
					</Form>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Posts);
