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
import ProjectLayout from './components/project/layout';
import Releases from './components/project/releases';
import App from './App';
import {Router, Route, Switch} from 'react-router'

import createHistory from 'history/createBrowserHistory';

const AppRoute = ({component: Component, layout: Layout, ...rest}) => (
  <Route {...rest} render={props => (
    <App>
      <Layout>
        <Component {...props} />
      </Layout>
    </App>
  )}/>
);

const NoLayout = props => (
  <div>
    {props.children}
  </div>
);

const MainLayout = props => (
  <App>
    {props.children}
  </App>
);


const AppRouter = () => (
  <Router history={createHistory()}>
    <Switch>
      <AppRoute exact path="/" layout={MainLayout} component={Home}/>
      <AppRoute exact path="/projects" layout={MainLayout} component={Projects}/>
      <AppRoute exact path="/new_project" layout={MainLayout} component={NewProject}/>
      <AppRoute path="/:project/tasks" layout={ProjectLayout} component={Tasks}/>
      <AppRoute path="/:project/new_task" layout={ProjectLayout} component={NewTask}/>
      <AppRoute path="/:project/releases" layout={ProjectLayout} component={Releases}/>
      <AppRoute path="/:project/home" layout={ProjectLayout} component={ProjectHome}/>
    </Switch>
  </Router>
);

export default AppRouter;
