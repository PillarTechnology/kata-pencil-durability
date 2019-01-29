import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-testing-library';
import Pencil from './Pencil';
import Eraser from './Eraser';

jest.mock('./Eraser', () => {
    const Eraser = jest.fn(() => <div />);
    return Eraser;
});

const mockHandleClick = jest.fn((e) => e);
global.console = {error: jest.fn()}

describe('Pencil behavior', () => {
    let defaultProps,
    renderDiv;
    
    beforeEach(() => {
       console.error.mockClear();
        defaultProps = { 
            handleClick: mockHandleClick,
            durabilityRating: 100,
            used: 1
        };
        renderDiv = document.createElement('div');
      });

    it('renders without crashing', () => {
        ReactDOM.render(<Pencil {...defaultProps}/>, renderDiv);
        ReactDOM.unmountComponentAtNode(renderDiv);
    });

    it('renders Eraser', () => {
        render(<Pencil {...defaultProps}/>, renderDiv);

        expect(Eraser).toHaveBeenCalledWith({
            handleClick: mockHandleClick}, {});
    });

    it('requires lead durability rating', () => {
        delete defaultProps.durabilityRating
        render(<Pencil {...defaultProps} />, renderDiv);

        expect(console.error).toHaveBeenCalledTimes(2);
    });

    it('requires used count', () => {
        delete defaultProps.used
        render(<Pencil {...defaultProps} />, renderDiv);

        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('renders a dullable pencil', () => {
        const {container} = render(<Pencil {...defaultProps}/>, renderDiv);
      
        const progresses = container.querySelectorAll('progress');
      
        expect(progresses).toHaveLength(1);
        expect(progresses[0]).toBeInTheDocument();
      });

    it('renders the pencil unused by default', () => {
        const {container} = render(<Pencil {...defaultProps}/>, renderDiv);
      
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('99');
    });

    it('cannot exceed specified durability', () => {
        defaultProps.durabilityRating = 4;
        const {container} = render(<Pencil {...defaultProps}/>, renderDiv);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('max')).toEqual('4');
    });

    it('indicates dullness as used', () => {
        defaultProps.durabilityRating = 4;
        defaultProps.used = 4;
        const {container} = render(<Pencil {...defaultProps}/>, renderDiv);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('0');
    });
});