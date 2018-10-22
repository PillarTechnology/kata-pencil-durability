import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-testing-library';
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
});