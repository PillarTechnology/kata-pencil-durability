import React, { Component } from 'react';
import Pencil from './Pencil';
import Sharpener from './Sharpener'
import PropTypes from 'prop-types';
import './Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    
    this.LOWER_CASE_WEIGHT = 1;
    this.UPPER_CASE_WEIGHT = 2;
    this.DEFAULT_DURABILITY = 4;
    this.DEFAULT_LENGTH = 10;

    this.state = {
      value: '',
      used: 0,
      length: this.props.length || this.DEFAULT_LENGTH,
      durabilityRating: this.props.durabilityRating || this.DEFAULT_DURABILITY,
      baseDurabilityRating: this.props.durabilityRating || this.DEFAULT_DURABILITY
    };

    this.handleChange = this.handleChange.bind(this);
    this.erase = this.erase.bind(this);
    this.sharpen = this.sharpen.bind(this);
  }

  degrade = (amountOfUse) => this.setState({used: amountOfUse});
  sharpen = (e) => {
    this.setState({
    used: 0,
    durabilityRating: this.state.durabilityRating + this.state.baseDurabilityRating,
    length: this.state.length - 1
  });
}
  erase = (e, f) => {
    console.log('ERASE');
  }
  getWeight = (char) => char === char.toLowerCase() ? this.LOWER_CASE_WEIGHT : this.UPPER_CASE_WEIGHT;
  
  measureWriting = (ix) => {
    const charArray = ix.split('');
    let numUsedChars = 0, i = 0;
    for (i = 0; i < charArray.length; i++) {
      numUsedChars = /\s/.test(charArray[i]) ? numUsedChars : numUsedChars += this.getWeight(charArray[i]);
      if (numUsedChars >= this.state.durabilityRating){
        break;
      }
    }
    return {degradedIndex: i, numUsedChars};
  };

  hasNeutralChars = (ix) => this.state.durabilityRating > ix;

  adjustWriting = (ix, base) => {
    const valueSubString = base.slice(0, ix + 1)
    return valueSubString.padEnd(base.length);
  };

  handleChange(event) {
    const raw = event.target.value;
    const writingInfo = this.measureWriting(raw);
    this.degrade(writingInfo.numUsedChars);

    this.setState(
      {
        value: this.hasNeutralChars(writingInfo.degradedIndex) ? 
                this.adjustWriting(writingInfo.degradedIndex, raw) : raw
      });
  }

  render() {
    return (
      <div className="Paper">
        <h1>Pencil Durability</h1>

        <Pencil durabilityRating={this.state.durabilityRating} 
            handleClick={this.erase}
            used={this.state.used}>
        </Pencil>

        <Sharpener length={this.state.length}
            handleClick={this.sharpen}>
        </Sharpener>

        <textarea value={this.state.value}
          onChange={this.handleChange}>
        </textarea>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  durabilityRating: PropTypes.number,
  length: PropTypes.number
};
