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
            durabilityRating: 100,
            used: 0
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

    it('requires used count', () => {
        delete defaultProps.used
        render(<Eraser {...defaultProps} />, renderDiv);

        expect(console.error).toHaveBeenCalledTimes(1);
    });
    
    it('Clicking "erase" calls handler', async () => {
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('Clicking "erase" calls handler with input text', async () => {
        const givenEraseVal = getlorem.words(1);
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: givenEraseVal}});

        expect(textInput.value).toBe(givenEraseVal);

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object), givenEraseVal);
    });

    it('Clicking "erase" clears input text', async () => {
        const {container} = render(<Eraser {...defaultProps} />, renderDiv);

        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: getlorem.words(1)}});

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(textInput.getAttribute('value')).toEqual('');
    });

    it('Disables ability to erase as remaining durability reaches zero', async () => {
        defaultProps.used = 100;
        const {container} = render(<Eraser {...defaultProps}/>, renderDiv);
        
        let eraserButton = container.querySelector('button');

        expect(eraserButton).toBeDisabled();
    });

});