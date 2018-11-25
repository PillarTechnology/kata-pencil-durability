import React, { Component } from 'react';
import Pencil from './Pencil';
import PropTypes from 'prop-types';
import './Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      used: 0,
      durabilityRating: this.props.durabilityRating || 4,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  degrade = (amountOfUse) => this.setState({used: amountOfUse});
  sharpen = (e) => this.setState({used: 0});
  
  getSliceIndex = (ix) => {
    const charArray = ix.split('');
    let numNonSpaceChars = 0, i = 0;
    for (i = 0; i < charArray.length; i++) {
      const weight = charArray[i] === charArray[i].toLowerCase() ? 1 : 2;
      numNonSpaceChars = /\s/.test(charArray[i]) ? numNonSpaceChars : numNonSpaceChars += weight;
      if (numNonSpaceChars >= this.state.durabilityRating){
        break;
      }
    }
    this.degrade(numNonSpaceChars);
    return i;
  };

  hasNeutralChars = (ix) => this.state.durabilityRating > ix;

  adjustRemainingValue = (ix, base) => {
    const valueSubString = base.slice(0, ix + 1)
    return valueSubString.padEnd(base.length);
  };

  handleChange(event) {
    let valueGivenDurability = event.target.value;  
    const raw = event.target.value;
    const sliceIndex = this.getSliceIndex(raw);

    this.setState(
      {
        value: this.hasNeutralChars(sliceIndex) ? 
                this.adjustRemainingValue(sliceIndex, raw) : valueGivenDurability
      });
  }

  render() {
    return (
      <div className="Paper">
        <h1>Pencil Durability</h1>
        <Pencil durabilityRating={this.state.durabilityRating} used={this.state.used} handleClick={this.sharpen}></Pencil>
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  durabilityRating: PropTypes.number
};
