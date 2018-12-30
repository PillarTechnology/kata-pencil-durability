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
    let defaultProps = { handleClick: mockHandleClick };

    beforeEach(() => {
        global.console = {error: jest.fn()}
      });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Pencil {...defaultProps}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders Eraser', () => {
        const div = document.createElement('div');
        render(<Pencil {...defaultProps}/>, div);

        expect(Eraser).toHaveBeenCalledWith({
            handleClick: mockHandleClick}, {});
    });

    it('requires lead durability rating', () => {
        const div = document.createElement('div');

        render(<Pencil {...defaultProps} durabilityRating={100}/>, div);

        expect(console.error).toHaveBeenCalledTimes(0);
    });

    it('renders a dullable pencil', () => {
        const div = document.createElement('div');
        const {container} = render(<Pencil {...defaultProps}/>, div);
      
        const progresses = container.querySelectorAll('progress');
      
        expect(progresses).toHaveLength(1);
        expect(progresses[0]).toBeInTheDocument();
      });

    it('renders the pencil unused by default', () => {
        const div = document.createElement('div');
        const {container} = render(<Pencil {...defaultProps}/>, div);
      
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('100');
    });

    it('cannot exceed specified durability', () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil {...defaultProps} durabilityRating={4}/>, div);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('max')).toEqual('4');
    });

    it('indicates dullness as used', () => {
        const div = document.createElement('div');

        const {container} = render(<Pencil {...defaultProps} durabilityRating={4} used={4}/>, div);
        const progress = container.querySelector('progress');

        expect(progress.getAttribute('value')).toEqual('0');
    });
});