import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import ProtoTypes from 'prop-types';

class LoginForm extends Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = evt => this.setState({
        data: { ...this.state.data, [evt.target.name]: evt.target.value }
    })

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if(!Validator.isEmail(data.email)) { errors.email = "Invalid email"; }
        if(!data.password) { errors.password = "Can't be blank"; }
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field error={!!errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" id="email" name="email"
                            placeholder="example@example.com"
                            value={data.email}
                            onChange={this.onChange}
                        />
                        {errors.email && <InlineError text={errors.email}/>}
                    </Form.Field>
                    <Form.Field error={!!errors.password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" id="password" name="password"
                            value={data.password}
                            onChange={this.onChange}
                        />
                        {errors.password && <InlineError text={errors.password}/>}
                    </Form.Field>
                    <Button primary>Login</Button>
                </Form>
            </div>
        );
    }
}

LoginForm.protoType  = {
    submit: ProtoTypes.func.isRequired
}

export default LoginForm;