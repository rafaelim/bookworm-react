import React from 'react';
import { connect } from 'react-redux';
import ProtoTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({ isConfirmed }) => (
    <div>
        { !isConfirmed && <ConfirmEmailMessage /> }
    </div>
);

DashboardPage.protoTypes = {
    isConfirmed: ProtoTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage);