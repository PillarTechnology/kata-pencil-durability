import PropTypes from 'prop-types';
import React from 'react';
import Eraser from './Eraser';

const Pencil = ({durabilityRating, eraserDurabilityRating, used, handleClick}) => {
    return <React.Fragment>
        <Eraser handleClick={handleClick} durabilityRating={eraserDurabilityRating}></Eraser>
        <progress data-testid='point-progress'
            value={used ? durabilityRating - used : durabilityRating} max={durabilityRating}></progress>
    </React.Fragment>
};
export default Pencil;
 
Pencil.propTypes = {
    durabilityRating: PropTypes.number.isRequired,
    eraserDurabilityRating: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    used: PropTypes.number.isRequired
};