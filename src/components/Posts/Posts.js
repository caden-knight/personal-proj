import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
				if(this._isMounted) {
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
				<div key={post.id} className="post-boxes">
					<h1 className="title">{post.title}</h1>
					<h2 className="author">{post.username}</h2>
					<h2 className="date">Posted on {post.date}</h2>
					<h3 className="content">{post.content}</h3>
				</div>
			);
		});

		return (
			<div className="top-div">
				Posts
				{!creatingNew ? (
					<div className="post-view">
						<button onClick={() => this.creatingToggle()}>New post</button>
						<input onClick={() => this.myPostsToggle()} type="checkbox" id="my-posts" />
						<label htmlFor="my-posts">My Posts</label>
						<div className="all-posts">{allPosts}</div>
					</div>
				) : (
					<form>
						<input placeholder="title" onChange={(title) => this.titleChange(title)} />
						<textarea
							onChange={(content) => this.contentChange(content)}
							placeholder="Share your experiences here"
							type="text"
						/>
						<button onClick={() => this.newPost()} type="submit">
							Post
						</button>
						<button onClick={() => this.creatingToggle()}>Cancel</button>
					</form>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Posts);
