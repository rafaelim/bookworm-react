import React from 'react';
import ProtoTypes from 'prop-types';

const InlineError = ({ text }) => (
    <span style={{ color: "#AE5856" }}>{text}</span>
);

InlineError.protoTypes = {
    text: ProtoTypes.string.isRequired
}

export default InlineError;