import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Posts.css';

class Posts extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			creatingNew: false,
			title: '',
			content: ''
		};
	}
	componentDidMount() {
		axios
			.get('/api/posts')
			.then((res) => {
				this.setState({ posts: res.data });
			})
			.catch((err) => alert(err));
	}
	creatingToggle() {
		const { creatingNew } = this.state;
		this.setState({ creatingNew: !creatingNew });
	}
	newPost() {
		const { title, content } = this.state;
		const id = this.props.userId;
		axios
			.post('/api/post', { title, content })
			.then((res) => {
				this.state.posts.push(res.data);
				this.creatingToggle();
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
		console.log(posts);
		const allPosts = posts.map((post) => {
			return (
				<div className="post-boxes" key={post.id}>
					<div className="postbox-info">
						<h1 className="title">{post.title}</h1>
						<h2 className="author">{post.username}</h2>
						<h2 className="date">{post.date}</h2>
						<h3 className="content">{post.content}</h3>
					</div>
				</div>
			);
		});
		return (
			<div className="top-div">
				Posts
				{!creatingNew ? (
					<div>
						<form>
							<button onClick={() => this.creatingToggle()}>New post</button>
						</form>
						{allPosts}
					</div>
				) : (
					<form>
						<input placeholder="title" onChange={(title) => this.titleChange(title)} />
						<textarea
							onChange={(content) => this.contentChange(content)}
							placeholder="Share your experiences here"
							type="text"
						/>
						<button onClick={() => this.newPost()}>Post</button>
						<button onClick={() => this.creatingToggle()}>Cancel</button>
					</form>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Posts);
