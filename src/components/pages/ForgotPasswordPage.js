import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import ProtoTypes from 'prop-types';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends Component {
    state = {
        success: false
    };

    submit = data => this.props.resetPasswordRequest(data)
        .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>
                {
                    this.state.success ?
                        <Message> Email has been sent.</Message> :
                        <ForgotPasswordForm submit={this.submit} />
                }
            </div>
        );
    }
}

ForgotPasswordPage.protoTypes = {
    resetPasswordRequest: ProtoTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);