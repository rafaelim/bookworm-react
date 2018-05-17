import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtoTypes from 'prop-types';
import * as actions from '../../actions/auth'

const HomePage = ({ isAuthenticated, logout }) => (
    <div>
        <h1>Home Page</h1>
        {isAuthenticated ? (
                <button onClick={() => logout()}>Logout</button>
            ) : (
                <div>
                    <Link to="login">Login</Link>
                    <Link to="signup">Sign Up</Link>
                </div>
            )
        }

    </div>
);

HomePage.protoTypes = {
    isAuthenticated: ProtoTypes.bool.isRequired,
    logout: ProtoTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: !!state.user.token
    }
}
export default connect(mapStateToProps, { logout: actions.logout })(HomePage)