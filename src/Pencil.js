import PropTypes from 'prop-types';
import React from 'react';

const Pencil = ({durabilityRating, used, length, handleClick}) => {
    return <React.Fragment>
        <button onClick={handleClick}
                disabled={length > 0 ? false : true}>Sharpen</button>
        <progress data-testid='point-progress'
            value={used ? durabilityRating - used : durabilityRating} max={durabilityRating}></progress>
    </React.Fragment>
};
export default Pencil;
 
Pencil.defaultProps = {
    durabilityRating: 100
};

Pencil.propTypes = {
    durabilityRating: PropTypes.number.isRequired,
    used: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
};