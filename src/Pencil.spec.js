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

describe('Pencil behavior', () => {
    let defaultProps,
        renderDiv;

    beforeEach(() => {
        global.console = {error: jest.fn()}

        defaultProps = { handleClick: mockHandleClick };
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
        render(<Pencil {...defaultProps} durabilityRating={100}/>, renderDiv);

        expect(console.error).toHaveBeenCalledTimes(0);
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

        expect(progress.getAttribute('value')).toEqual('100');
    });

    it('cannot exceed specified durability', () => {
        const {container} = render(<Pencil {...defaultProps} durabilityRating={4}/>, renderDiv);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('max')).toEqual('4');
    });

    it('indicates dullness as used', () => {
        const {container} = render(<Pencil {...defaultProps} durabilityRating={4} used={4}/>, renderDiv);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('0');
    });
});