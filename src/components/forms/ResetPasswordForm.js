import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import { isEmail } from 'validator';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
    state = {
        data: {
            token: this.props.token,
            password: '',
            passwordConfirmation: ''
        },
        loading: false,
        errors: {}
    }

    onChange = (evt) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [evt.target.name]: evt.target.value }
        })
    }


    onSubmit = (evt) => {
        evt.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = (data) => {
        const errors = {};

        if (!data.password) { errors.password = "Can't be blank"; }
        if (data.password !== data.passwordConfirmation) {
            errors.password = "Passwords must match";
        }
        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && <Message negative>{errors.global}</Message>}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">New password</label>
                    <input
                        type="password" id="password" name="password"
                        value={data.password} onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Form.Field error={!!errors.passwordConfirmation}>
                    <label htmlFor="password">Confirm your new password</label>
                    <input
                        type="password" id="passwordConfirmation" name="passwordConfirmation"
                        value={data.passwordConfirmation} onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.protoTypes = {
    submit: ProtoTypes.func.isRequired
}

export default ForgotPasswordForm;