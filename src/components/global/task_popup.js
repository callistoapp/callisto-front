/**
 * Created by clementmondion on 09/01/2018.
 */

import React, {Component} from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react'
import {compose, graphql} from "react-apollo/index";
import { gql } from 'apollo-boost';
import * as _ from "lodash";

const getTaskQuery = graphql(gql`
  query task($id: Int!) {
    task(id: $id){
        name,
        description
    }
  }
`, {
    options: (props) => ({
        variables: {id: _.get(props, 'id')},
    })
});

const deleteTaskMutation = graphql(gql`
    mutation deleteTask($id: Int!) {
        deleteTask(id: $id)
    }`
);

const withData = compose(
    getTaskQuery,
    deleteTaskMutation
);

class TaskPopup extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        }
    }

    render() {
        return (
            <Modal open={this.state.open} onClose={this.props.onClose}>
                <Modal.Header>{_.get(this.props, 'data.task.name')}</Modal.Header>
                <Modal.Content>
                    {_.get(this.props, 'data.task.description')}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='green'
                        onClick={() => this.props.mutate({
                            variables: {
                                id: this.props.id,
                            }
                        }).then(() => this.setState({open: false}))}
                        inverted>
                        <Icon name='remove'/> Supprimer
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    };
}

export default withData(TaskPopup);
