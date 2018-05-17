import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm.js';
import ProtoTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class LoginPage extends Component {
    submit = (data) => this.props.login(data)
        .then(() => this.props.history.push('/'));

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

LoginPage.protoTypes = {
    history: ProtoTypes.shape({
        push: ProtoTypes.func.isRequired
    }).isRequired,
    login: ProtoTypes.func.isRequired
}
export default connect(null, { login })(LoginPage);