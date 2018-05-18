import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProtoTypes from 'prop-types'
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
    state = {
        loading: true,
        success: false
    };

    componentDidMount() {
        this.props.confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }))
    }

    render() {
        const { loading, success } = this.state;
        return (
            <div>
                {
                    loading &&
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Header>
                            Validating your email...
                        </Message.Header>
                    </Message>
                }

                {
                    !loading && success &&
                    <Message success icon>
                        <Icon name="checkmark" />
                        <Message.Header>
                            Thank you. Your account has been verified.
                        </Message.Header>
                        <Link to="/dashboard">Go to your dashboard</Link>
                    </Message>
                }

                {
                    !loading && !success &&
                    <Message negative icon>
                        <Icon name="warning sign" />
                        <Message.Header>
                            Ops... Invalid token it seems.
                        </Message.Header>
                    </Message>
                }
            </div>
        );
    }
}

ConfirmationPage.protoTypes = {
    confirm: ProtoTypes.func.isRequired,
    match: ProtoTypes.shape({
        params: ProtoTypes.shape({
            token: ProtoTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null, { confirm })(ConfirmationPage)