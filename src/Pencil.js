import PropTypes from 'prop-types';
import React from 'react';

const Pencil = ({durabilityRating}) => <progress value={durabilityRating} max={durabilityRating}></progress>;
export default Pencil;
 
Pencil.defaultProps = {
    durabilityRating: 100
};

Pencil.propTypes = {
    durabilityRating: PropTypes.number.isRequired
};