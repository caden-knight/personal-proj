import React, { Component } from 'react'

export default class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    render() {
        return (
            <div>Posts</div>
        )
    }
}