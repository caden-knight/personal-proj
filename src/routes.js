import React from 'react'
import {Switch, Route} from 'react-router'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import About from './components/About/About'
import Ask from './components/Ask/Ask'
import Posts from './components/Posts/Posts'
import Post from './components/Post/Post'
import DreamJournal from './components/DreamJournal/DreamJournal'
import SingleEntry from './components/SingleEntry/SingleEntry'
import Answer from './components/Answer/Answer'

export default (
    <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/posts' component={Posts}></Route>
        <Route path='/post/:postid' component={Post}></Route>
        <Route path='/ask' component={Ask}></Route>
        <Route path='/journal' component={DreamJournal}></Route>
        <Route path='/entry/:journalid' component={SingleEntry}></Route>
        <Route path='/questions' component={Answer}></Route>
    </Switch>
)