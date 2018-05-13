import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden
} from "material-ui";
import { Person, Notifications} from "@material-ui/icons";
// import CustomInput from "./custom_input";
// import SearchButton from "./icon_button";

import headerLinksStyle from "../assets/jss/material-dashboard-react/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    notificationOpen: false,
    profileOpen     : false
  };

  handleClickNotification = () => {
    this.setState({notificationOpen: !this.state.notificationOpen});
  };

  handleClickProfile = () => {
    this.setState({profileOpen: !this.state.profileOpen});
  };

  handleCloseNotification = () => {
    this.setState({notificationOpen: false});
  };

  handleCloseProfile = () => {
    this.setState({profileOpen: false});
  };

  handleCloseAll = () => {
    this.setState({notificationOpen: false, profileOpen: false});
  };

  render() {
    const { classes } = this.props;
    const { notificationOpen, profileOpen } = this.state;
    return (
      <div>
        {/*<CustomInput*/}
          {/*formControlProps={{*/}
            {/*className: classes.margin + " " + classes.search*/}
          {/*}}*/}
          {/*inputProps={{*/}
            {/*placeholder: "Search",*/}
            {/*inputProps: {*/}
              {/*"aria-label": "Search"*/}
            {/*}*/}
          {/*}}*/}
        {/*/>*/}
        {/*<SearchButton*/}
          {/*color="white"*/}
          {/*aria-label="edit"*/}
          {/*customClass={classes.margin + " " + classes.searchButton}*/}
        {/*>*/}
          {/*<Search className={classes.searchIcon} />*/}
        {/*</SearchButton>*/}
        {/*<IconButton*/}
          {/*color="inherit"*/}
          {/*aria-label="Dashboard"*/}
          {/*className={classes.buttonLink}*/}
        {/*>*/}
          {/*<Dashboard className={classes.links} />*/}
          {/*<Hidden mdUp>*/}
            {/*<p className={classes.linkText}>Dashboard</p>*/}
          {/*</Hidden>*/}
        {/*</IconButton>*/}
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={notificationOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClickNotification}
              className={classes.buttonLink}
            >
              <Notifications className={classes.links} />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <p onClick={this.handleClickNotification} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-end"
            eventsEnabled={notificationOpen}
            className={
              classNames({ [classes.popperClose]: !notificationOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleCloseAll}>
              <Grow
                in={notificationOpen}
                id="menu-list-notification"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>

        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Person"
              aria-owns={profileOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClickProfile}
              className={classes.buttonLink}
            >
              <Person className={classes.links} />
              <Hidden mdUp>
                <p onClick={this.handleClickProfile} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={profileOpen}
            className={
              classNames({ [classes.popperClose]: !profileOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleCloseAll}>
              <Grow
                in={profileOpen}
                id="menu-list-profile"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      My profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.location = 'http://auth.callisto.com/logout'}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
