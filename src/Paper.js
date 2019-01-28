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
    const start = this.state.value.lastIndexOf(f)
    const spaces = f.split('').map((char) => ' ').reduce((s, acc) => acc.concat(s));
    const textPrefix = this.state.value.substr(0, start);
    const textSuffix = this.state.value.substr(start + f.length, this.state.value.length);
    const textWithErased = textPrefix + spaces + textSuffix;
    
    this.setState({value: textWithErased});
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

  hasNeutralChars = (ix) => this.state.durabilityRating >= ix;

  diffAndPreventEditShift = (raw) => {
    const isSpaceChar = (c) => /\s/.test(c),
          charArray = this.state.value.trim().split(''),
          charArrayNext = raw.split('');
    let charUnshiftCnt = 0;

    if(charArray.length < 1) return raw;

    const getIncrementAmount = (current, next) => {
      return next && ((isSpaceChar(current) && !isSpaceChar(next)) ||
                          (!isSpaceChar(current) && current !== next)) ? 1 : 0;
    }
    const shouldDoUnshift = (next) => next && isSpaceChar(next) && charUnshiftCnt > 0;
    const doUnshift = (idx, next) => {
      if(shouldDoUnshift(next)) {
        charArrayNext.splice(idx, charUnshiftCnt);
        charUnshiftCnt = 0;
      }
    }
  
    const prefix = charArray.reduce((acc, cur, idx) => {
      const editCollisionSymbol = '@',
            next = charArrayNext[idx];
      doUnshift(idx, next);
      const nextWithShift = charArrayNext[idx];
      charUnshiftCnt = charUnshiftCnt+=getIncrementAmount(cur, nextWithShift);


      const isEditCollision = () => !isSpaceChar(cur) && cur !== nextWithShift;
      return nextWithShift ? 
        isEditCollision() ? acc.concat(editCollisionSymbol) : acc.concat(nextWithShift) 
          : acc.concat(cur);
    });

    const suffix = charArrayNext.join('').substr(charArray.length, charArrayNext.length - 1);
    return prefix.concat(suffix);
  }

  adjustWriting = (ix, raw) => {
    const valueSubString = raw.slice(0, ix + 1)
    return valueSubString.padEnd(raw.length);
  };

  handleChange(event) {
    const raw = event.target.value;
    const writingInfo = this.measureWriting(raw);
    this.degrade(writingInfo.numUsedChars);

   const rawWithUnshift = this.diffAndPreventEditShift(raw);

    this.setState(
      {
        value: this.hasNeutralChars(writingInfo.degradedIndex) ? 
                this.adjustWriting(writingInfo.degradedIndex, rawWithUnshift) : rawWithUnshift
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
