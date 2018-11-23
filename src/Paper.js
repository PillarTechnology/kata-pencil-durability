import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', used: 0, durabilityRating: this.props.durabilityRating || 4};

    this.handleChange = this.handleChange.bind(this);
  }
  
  getSliceIndex = (ix) => {
    const charArray = ix.split('');
    let count = 0, i = 0;
    for (i = 0; i < charArray.length; i++) {
      count = /\s/.test(charArray[i]) ? count : count+=1;
      if (count >= this.state.durabilityRating){
        break;
      }
    }
   return i;
  }

  handleChange(event) {
    const raw = event.target.value;
    let valueGivenDurability = event.target.value;
    const charactersUsingLead = valueGivenDurability.replace(/\s+/g, '');
    
    if (this.state.durabilityRating - charactersUsingLead.length <= 0) {
      const sliceIndex = this.getSliceIndex(raw);
      const valueSubString = raw.slice(0, sliceIndex + 1)
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
