import PropTypes from 'prop-types';
import React from 'react';

const Sharpener = ({length, handleClick}) => {
    return (
        <button onClick={handleClick}
                disabled={length > 0 ? false : true}>Sharpen</button>
    )
};
export default Sharpener;


Sharpener.propTypes = {
    handleClick: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
};