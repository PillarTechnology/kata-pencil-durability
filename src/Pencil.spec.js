import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent} from 'react-testing-library';
import Pencil from './Pencil';

describe('pencil behavior', () => {
    beforeEach(() => {
        global.console = {error: jest.fn()}
      });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Pencil />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('requires lead durability rating', () => {
        const div = document.createElement('div');

        render(<Pencil durabilityRating={100}/>, div);

        expect(console.error).toHaveBeenCalledTimes(0);
    });

    it('renders a dullable pencil', () => {
        const div = document.createElement('div');
        const {container} = render(<Pencil />, div);
      
        const progresses = container.querySelectorAll('progress');
      
        expect(progresses).toHaveLength(1);
        expect(progresses[0]).toBeInTheDocument();
      });

    it('renders the pencil unused by default', () => {
        const div = document.createElement('div');
        const {container} = render(<Pencil />, div);
      
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('100');
    });

    it('cannot exceed specified durability', () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil durabilityRating={4}/>, div);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('max')).toEqual('4');
    });

    it('indicates dullness as used', () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil durabilityRating={4} used={4}/>, div);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('0');
    });

    it('Clicking "sharpen" calls handler', async () => {
        const mockHandleClick = jest.fn((e) => e);
        const props = {
            durabilityRating: 100, 
            used: 99,
            length: 10,
            handleClick: mockHandleClick
        };
        const div = document.createElement('div');
        const {container} = render(<Pencil {...props} />, div);

        let sharpenButton = container.querySelector('button');
        fireEvent.click(sharpenButton);
      
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });
    
    it('Disables ability to sharpen as length reached', async () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil durabilityRating={4} used={4} length={0}/>, div);
        let sharpenButton = container.querySelector('button');

        expect(sharpenButton).toBeDisabled();
    });

    it('Enables ability to sharpen as length remaining', async () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil durabilityRating={4} used={4} length={1}/>, div);
        let sharpenButton = container.querySelector('button');

        expect(sharpenButton).not.toBeDisabled();
    });
});