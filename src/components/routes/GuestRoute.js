import React from 'react'
import ProtoTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

export const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
    } />
);

GuestRoute.protoTypes = {
    component: ProtoTypes.func.isRequired,
    isAuthenticated: ProtoTypes.bool.isRequired
}
const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: !!state.user.token
    }
}
export default connect(mapStateToProps)(GuestRoute);