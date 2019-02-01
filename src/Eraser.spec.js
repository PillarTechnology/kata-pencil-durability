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
    
    it('Clicking "erase" calls handler', async () => {
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        const eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
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
});