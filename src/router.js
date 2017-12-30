/**
 * Created by clementmondion on 16/12/2017.
 */

import React from 'react';
import Projects from './components/projects';
import NewProject from './components/new_project';
import Home from './components/home';
import ProjectHome from './components/project/home';
import Tasks from './components/project/tasks';
import NewTask from './components/project/new_task';
import Releases from './components/project/releases';
import App from './App';
import {Router, Route, Switch} from 'react-router'

import createHistory from 'history/createBrowserHistory';


const AppRouter = () => (
    <Router history={createHistory()}>
        <App>
            <Route exact path="/" component={Home}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/new_project" component={NewProject}/>
            <Route path="/:project/home" component={ProjectHome}/>
            <Route path="/:project/tasks" component={Tasks}/>
            <Route path="/:project/new_task" component={NewTask}/>
            <Route path="/:project/releases" component={Releases}/>
        </App>
    </Router>
);

export default AppRouter;


