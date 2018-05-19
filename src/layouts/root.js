import React from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "material-ui";
import Header from "../components/header";
import {mainRoutes} from "../routes";

import appStyle from "../assets/jss/material-dashboard-react/appStyle";

const switchRoutes = (
  <Switch>
    {_.map(mainRoutes, (route, key) => {
      if (route.redirect)
        return <Redirect from={route.path} to={route.to} key={key} />;
      return <Route path={route.path} component={route.component} key={key} />;
    })}
  </Switch>
);

class Main extends React.Component {
  componentDidUpdate() {
    this.refs.rootPanel.scrollTop = 0;
  }

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.rootPanel} ref="rootPanel">
          <Header
            routes={mainRoutes}
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
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Main);
