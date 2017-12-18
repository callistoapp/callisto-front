import React, {Component} from 'react';
import SideBar from '../sidebar';


class ProjectLayout extends Component {
    render() {
        return (
            <SideBar
                visible={true}
                active={this.props.active}
            >
                {this.props.children}
            </SideBar>
        )
    };
}

export default ProjectLayout;
