import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import Sharpener from './Sharpener';

describe('Sharpener behavior', () => {
    const mockHandleClick = jest.fn((e) => e);
    
    it('Clicking "sharpen" calls handler', async () => {
        const props = {
            length: 10,
            handleClick: mockHandleClick
        };
        const div = document.createElement('div');
        const {container} = render(<Sharpener {...props} />, div);

        let sharpenButton = container.querySelector('button');
        fireEvent.click(sharpenButton);
    
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('Disables ability to sharpen as length reached', async () => {
        const div = document.createElement('div');

        const {container} = render(<Sharpener length={0} handleClick={mockHandleClick}/>, div);
        let sharpenButton = container.querySelector('button');

        expect(sharpenButton).toBeDisabled();
    });

    it('Enables ability to sharpen as length remaining', async () => {
        const div = document.createElement('div');

        const {container} = render(<Sharpener length={1} handleClick={mockHandleClick}/>, div);
        let sharpenButton = container.querySelector('button');

        expect(sharpenButton).not.toBeDisabled();
    });

});