import React, { Component } from 'react'
import axios from 'axios';

export default class DreamJournal extends Component {
    constructor() {
        super()
        this.state = {
            entries: []
        }
    }
    componentDidMount() {
        axios
        .get('/api/entries')
        .then(res => {
            this.setState({entries: res.data})
        })
        .catch(err => console.log(err))
    }
    render() {
        const {entries} = this.state
        const allEntries = entries.map(entry => {
            return <div key={entry.id}>
                <h1>{entry.title}</h1>
                <h2>{entry.content}</h2>
            </div>
        })
        return (
            <div>DreamJournal
                {allEntries}
            </div>
        )
    }
}