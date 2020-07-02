import React, { Component } from 'react'
import {Jumbotron, Button} from 'reactstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
class Home extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <Jumbotron>
                <h1 className="display-3">Welcome, {this.props.username}</h1>
                <p className="lead">Hi there!

Welcome to Lucidography. We’re thrilled to see you here!

We’re confident that Lucidography will help you soar through the clouds and do anything you want, tonight. Dreams cometrue here... literally!

Get to know us in our Lucid Dreaming video. You’ll be guided through Lucid Dreaming by our experts to ensure you get the very best out of our service.

You can also find more of our guides here to learn more about how you can have a Lucid Dream tonight.

Take care!
Harambe, CEO and founder of Lucidography</p>
<p className="lead">
    <Button color="primary" href="#about">Learn more!</Button>
</p>
            </Jumbotron>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Home)