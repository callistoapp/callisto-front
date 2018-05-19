// /**
//  * Created by clementmondion on 16/12/2017.
//  */
//
// import React, {Component} from 'react';
// import propTypes from 'prop-types';
// import {Sidebar, Menu, Icon} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
//
//
// class SideBar extends Component {
//     static propTypes = {
//         active: propTypes.number.isRequired,
//     };
//
//     render() {
//         return (
//             <Sidebar.Pushable className="side-bar">
//                 <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical
//                          inverted>
//                     <Menu.Item name='home' active={this.props.active === 1}  as={Link} to='home'>
//                         <Icon name='home'/>
//                         Home
//                     </Menu.Item>
//                     <Menu.Item name='tasks' active={this.props.active === 2}  as={Link} to='tasks'>
//                         <Icon name='tasks'/>
//                         Tasks
//                     </Menu.Item>
//                     <Menu.Item name='releases' active={this.props.active === 3}  as={Link} to='releases'>
//                         <Icon name='tags'/>
//                         Releases
//                     </Menu.Item>
//                 </Sidebar>
//                 <Sidebar.Pusher>
//                     <div style={{margin: 10}}>
//                         {this.props.children}
//                     </div>
//                 </Sidebar.Pusher>
//             </Sidebar.Pushable>
//         )
//     };
// }
//
// export default SideBar;

import React from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import {graphql} from 'react-apollo';
import qs from 'query-string';
import {gql} from 'apollo-boost';

import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from "material-ui";

import {Add} from '@material-ui/icons';

import HeaderLinks from "../components/header_links";

import sidebarStyle from "../assets/jss/material-dashboard-react/sidebarStyle";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const {
    classes,
    color,
    logo,
    image,
    routes,
    data: {projectList: projects},
    handleNewProjectToggle,
    location
  } = props;

  let links = (
    <List className={classes.list}>
      {_.map(routes, (route, key) => {
        if (route.redirect) return null;
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(route.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(route.path)
        });
        return (
          <NavLink
            to={`${route.path}${location.search}`}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <route.icon />
              </ListItemIcon>
              <ListItemText
                primary={route.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  let brand = (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </a>
    </div>
  );
  let projectSwitch = (
    <div className={classes.projectSwitch}>
      <div className={classes.projectFormSwitch}>
        <FormControl className={classes.fullWidth}>
          <InputLabel className={classes.whiteFont} htmlFor="project-switch">Project</InputLabel>
          <Select
            className={classes.whiteFont}
            fullWidth
            value={parseInt(qs.parse(props.location.search).project_id, 10)}
            onChange={(e) => props.history.push({path: ".", search: qs.stringify({project_id: e.target.value})})}
            inputProps={{
              name: 'age',
              id: 'project-switch',
            }}
          >
            {_.map(projects, (project, key) =>
              <MenuItem value={project.id} key={key}>{project.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <IconButton
        color="primary"
        className={[classes.button, classes.twentyPercent].join(', ')}
        aria-label="New project"
        onClick={handleNewProjectToggle}
      >
        <Add className={classes.whiteFont}/>
      </IconButton>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          {projectSwitch}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          {projectSwitch}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};


const WithData = graphql(gql`
  {projectList {
    name,
    id
  }}
`);

export default WithData(withStyles(sidebarStyle)(Sidebar));

