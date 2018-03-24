/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import {Header, } from 'semantic-ui-react'

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
