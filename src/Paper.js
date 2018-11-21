import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', used: 0, durabilityRating: this.props.durabilityRating || 4};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const raw = event.target.value;
    let valueGivenDurability = event.target.value;

    if (this.state.durabilityRating - valueGivenDurability.length <= 0) {
      const valueSubString = valueGivenDurability.slice(0, this.state.durabilityRating)
      valueGivenDurability = valueSubString.padEnd(raw.length);
    }
    this.setState(
      {
        value: valueGivenDurability
      });
  }

  render() {
    return (
      <div className="Paper">
        <h1>Pencil Durability</h1>
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  durabilityRating: PropTypes.number
};
