import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Eraser extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', used: 0};

        this.erase = this.erase.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    erase = (e) => {
        const eraseLength = this.state.value.split('').filter((c) => !/\s/.test(c)).length;
        if(this.state.value && eraseLength > 0) {
            this.props.handleClick(e, this.state.value);
            this.setState({value: '', used: this.state.used + this.state.value.length});
        }
    };

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <input value={this.state.value} onChange={this.handleChange}></input>
                <button onClick={this.erase} disabled={this.state.used >= this.props.durabilityRating ? true : false}>Erase</button>
            </React.Fragment>
        );
      }
    return 
};
export default Eraser;

Eraser.propTypes = {
    durabilityRating: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};