import React from 'react';
import ReactDOM from 'react-dom';
import getlorem from 'getlorem';
import {render, fireEvent} from 'react-testing-library';
import Eraser from './Eraser';

describe('Eraser behavior', () => {
    global.console = {error: jest.fn()}
    const mockHandleClick = jest.fn((e) => e);
    let defaultProps,
        renderDiv;

    beforeEach(() => {
        console.error.mockClear();
        mockHandleClick.mockClear();
        defaultProps = {
            handleClick: mockHandleClick,
            durabilityRating: 100
        };
        renderDiv = document.createElement('div');
      });

    it('renders without crashing', () => {
        ReactDOM.render(<Eraser {...defaultProps}/>, renderDiv);
        ReactDOM.unmountComponentAtNode(renderDiv);
    });

    it('requires eraser durability rating', () => {
        delete defaultProps.durabilityRating
        render(<Eraser {...defaultProps} />, renderDiv);

        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('renders eraser enabled', () => {
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        const eraserButton = container.querySelector('button');

        expect(eraserButton).not.toBeDisabled();
    });
    
    it('Handles attempts to erase nothing gracefully', () => {
        const {container} = render(<Eraser {...defaultProps}/>, renderDiv);

        const eraserButton = container.querySelector('button');
        fireEvent.click(eraserButton);

        expect(mockHandleClick).not.toHaveBeenCalled();
    });

    it('Clicking "erase" calls handler with input text', async () => {
        const givenEraseVal = getlorem.words(1);
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        const textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: givenEraseVal}});

        expect(textInput.value).toBe(givenEraseVal);

        const eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object), givenEraseVal);
    });

    it('Clicking "erase" clears input text', async () => {
        const givenWriting = getlorem.words(1);
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        const textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: givenWriting}});

        expect(textInput.getAttribute('value')).toEqual(givenWriting);

        const eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(textInput.getAttribute('value')).toEqual('');
    });

    it('Disables ability to erase as remaining durability becomes zero', async () => {
        defaultProps.durabilityRating = 5;
        const writingToErase = '12345';
        const {container} = render(<Eraser {...defaultProps}/>, renderDiv);

        const textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: writingToErase}});

        const eraserButton = container.querySelector('button');
        fireEvent.click(eraserButton);

        expect(eraserButton).toBeDisabled();
    });

    it('Degrades eraser by one per erased non white space character', () => {
        defaultProps.durabilityRating = 3;
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);
        
        let eraserButton = container.querySelector('button');
        
        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: 'a   '}});

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);

        expect(eraserButton).not.toBeDisabled();
    });

      it('Clicking "erase" calls handler with truncated input text when durability exceeded', async () => {
        defaultProps.durabilityRating = 4;
        const givenEraseVal = '12 345';
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: givenEraseVal}});

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object), '12 34');
    });
});