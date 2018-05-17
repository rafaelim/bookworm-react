import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';

class SignupPage extends Component {
    
    submit = (data) => 
        this.props.signup(data)
            .then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <div>
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}

SignupPage.protoTypes = {
    history: ProtoTypes.shape({
        push: ProtoTypes.func.isRequired
    }).isRequired,
    signup: ProtoTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);