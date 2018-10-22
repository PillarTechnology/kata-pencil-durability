import PropTypes from 'prop-types';
import React from 'react';

const Pencil = ({remainingLead}) => <p></p>;
export default Pencil;
 
Pencil.defaultProps = {
    remainingLead: 100
};

Pencil.propTypes = {
   remainingLead: PropTypes.number.isRequired
};