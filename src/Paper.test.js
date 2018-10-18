import React from 'react';
import ReactDOM from 'react-dom';
import {render, waitForElement} from 'react-testing-library';
import getlorem from 'getlorem';
import Paper from './Paper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Paper />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the heading', () => {
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper />, div);

  expect(container.querySelector('h1')).toBeInTheDocument();
  expect(getByText('Pencil Durability'));
});

it('renders the writing recorder', () => {
  const div = document.createElement('div');
  const {container} = render(<Paper />, div);

  const textareas = container.querySelectorAll('textarea');

  expect(textareas).toHaveLength(1);
  expect(textareas[0]).toBeInTheDocument();
  expect(textareas[0]).toBeEmpty();
});

it('records writing', async () => {
  const expectedWriting = getlorem.words(5);
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper />, div);

  let textarea = container.querySelector('textarea');
  textarea.textContent = expectedWriting;

  textarea = await waitForElement(() =>
    getByText(expectedWriting)
  );
});
