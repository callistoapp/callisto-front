/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'


class SideBar extends Component {
    static propTypes = {
        active: propTypes.number.isRequired,
    };

    render() {
        return (
            <Sidebar.Pushable className="side-bar">
                <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical
                         inverted>
                    <Menu.Item name='home' active={this.props.active == 1}  as={Link} to='home'>
                        <Icon name='home'/>
                        Home
                    </Menu.Item>
                    <Menu.Item name='tasks' active={this.props.active == 2}  as={Link} to='tasks'>
                        <Icon name='tasks'/>
                        Tasks
                    </Menu.Item>
                    <Menu.Item name='releases' active={this.props.active == 3}  as={Link} to='releases'>
                        <Icon name='tags'/>
                        Releases
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <div style={{margin: 10}}>
                        {this.props.children}
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    };
}

export default SideBar;
