import React from 'react';
import getlorem from 'getlorem';
import {render, fireEvent} from 'react-testing-library';
import Eraser from './Eraser';

describe('Eraser behavior', () => {
    const mockHandleClick = jest.fn((e) => e);
    let props,
        renderDiv;

    beforeEach(() => {
        props = {
            handleClick: mockHandleClick
        };
        renderDiv = document.createElement('div');
      });
    
    it('Clicking "erase" calls handler', async () => {
        const {container} = render(<Eraser {...props} />, renderDiv);

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('Clicking "erase" calls handler with input text', async () => {
        const givenEraseVal = getlorem.words(1);
        const {container} = render(<Eraser {...props} />, renderDiv);

        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: givenEraseVal}});

        expect(textInput.value).toBe(givenEraseVal);

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object), givenEraseVal);
    });

    it('Clicking "erase" clears input text', async () => {
        const {container} = render(<Eraser {...props} />, renderDiv);

        let textInput = container.querySelector('input');
        fireEvent.change(textInput, {target: {value: getlorem.words(1)}});

        let eraseButton = container.querySelector('button');
        fireEvent.click(eraseButton);
    
        expect(textInput.getAttribute('value')).toEqual('');
    });

});