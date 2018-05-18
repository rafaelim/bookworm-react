import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm.js';
import ProtoTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    submit = (data) => this.props.login(data)
        .then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit} />
                <Link to="/forgot_password">Forgot Password?</Link>
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