/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Container, Segment, Header, Grid, Divider} from 'semantic-ui-react'

class Home extends Component {
    static propTypes = {};


    render() {
        return (
            <div>
                <Header as="h1">
                    HOME
                </Header>
                Welcome to the app home page
            </div>
        )
    };
}

export default Home;
