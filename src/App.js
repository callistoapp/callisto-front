import React, {Component} from 'react';
import {withRouter} from 'react-router';
import TopBar from './components/topbar';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 1
        }
    };

    render() {
        return (
            <div>
                <TopBar/>
                <div className="content">{this.props.children}</div>
            </div>
        )
    };
}

export default withRouter(App);
