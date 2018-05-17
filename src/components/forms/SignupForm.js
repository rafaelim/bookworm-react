import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { isEmail } from 'validator';
import InlineError from '../messages/InlineError';

class SignupForm extends Component {
    state = {
        data: {
            email: '',
            password: ''
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

        if (!isEmail(data.email)) { errors.email = "Invalid email"; }
        if (!data.password) { errors.password = "Can't be blank"; }

        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email" id="email" name="email"
                        placeholder="example@example.com"
                        value={data.email} onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" id="password" name="password"
                        value={data.password} onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Sign Up</Button>
            </Form>
        );
    }
}

SignupForm.protoTypes = {
    submit: ProtoTypes.func.isRequired
}

export default SignupForm;