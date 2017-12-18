/**
 * Created by clementmondion on 16/12/2017.
 */

import React from 'react';
import Projects from './components/projects';
import Home from './components/home';
import ProjectHome from './components/project/home';
import Tasks from './components/project/tasks';
import Releases from './components/project/releases';
import App from './App';
import {Router, Route, Switch} from 'react-router'

import createHistory from 'history/createBrowserHistory';


const AppRouter = () => (
    <Router history={createHistory()}>
        <App>
            <Route exact path="/" component={Home}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/:project/home" component={ProjectHome}/>
            <Route path="/:project/tasks" component={Tasks}/>
            <Route path="/:project/releases" component={Releases}/>
        </App>
    </Router>
);

export default AppRouter;


