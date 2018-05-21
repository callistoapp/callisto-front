import React from "react";
import * as _ from 'lodash';
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import Sidebar from "../components/sidebar";
import NewProject from "../components/popups/new_project";
import Header from "../components/header";

import {dashboardRoutes} from "../routes";

import appStyle from "../assets/jss/material-dashboard-react/appStyle";

import image from "../assets/img/callisto_background.jpg";
import logo from "../assets/img/logo_callisto_white.png";

const switchRoutes = (
  <Switch>
    {_.map(dashboardRoutes, (route, key) => {
      if (route.redirect)
        return <Redirect from={route.path} to={route.to} key={key} />;
      return <Route path={route.path} component={route.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false,
    newProjectOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleNewProjectToggle = () => {
    this.setState({ newProjectOpen: !this.state.newProjectOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Callisto"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          handleNewProjectToggle={this.handleNewProjectToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {/*{this.getRoute() ? <Footer /> : null}*/}
          <NewProject handleClose={this.handleNewProjectToggle} open={this.state.newProjectOpen}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
