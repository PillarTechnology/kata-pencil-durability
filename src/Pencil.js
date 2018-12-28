import PropTypes from 'prop-types';
import React from 'react';

const Pencil = ({durabilityRating, used}) => {
    return (
        <progress data-testid='point-progress'
            value={used ? durabilityRating - used : durabilityRating} max={durabilityRating}></progress>
    )
};
export default Pencil;
 
Pencil.defaultProps = {
    durabilityRating: 100
};

Pencil.propTypes = {
    durabilityRating: PropTypes.number.isRequired,
    used: PropTypes.number.isRequired
};