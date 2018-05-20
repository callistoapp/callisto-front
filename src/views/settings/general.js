import React from 'react';
import ProjectForm from '../../forms/project_settings';
import {Mutation} from "react-apollo";
import {gql} from "apollo-boost/lib/index";
import {Button} from "material-ui";


const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

class General extends React.Component {
  state = {...this.props.project};

  handleChange = name => e => {
    this.setState({[name]: e.target.value}, () =>
      this.props.handleChange(this.state)
    );
  };

  render() {
    return ([
        <ProjectForm {...this.state} handleChange={this.handleChange}/>,
        <Mutation mutation={DELETE_PROJECT}>
          {(mutation, { receivedData }) => (
            <Button size="small" color="secondary" onClick={() => {
              mutation({variables: {id: this.props.project.id}})
            }}>
              Delete
            </Button>
          )}
        </Mutation>
    ])
  }
};

export default General;
