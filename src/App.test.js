import React from 'react';
import ReactDOM from 'react-dom';
import {render, waitForElement} from 'react-testing-library';
import getlorem from 'getlorem';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the heading', () => {
  const div = document.createElement('div');
  const {container, getByText} = render(<App />, div);

  expect(container.querySelector('h1')).toBeInTheDocument();
  expect(getByText('Pencil Durability'));
});

it('renders the writing recorder', () => {
  const div = document.createElement('div');
  const {container} = render(<App />, div);

  const input = container.querySelector('input');

  expect(input).toBeInTheDocument();
  expect(input).toBeEmpty();
});

it('records writing', async () => {
  const expectedWriting = getlorem.words(5);
  const div = document.createElement('div');
  const {container, getByText} = render(<App />, div);

  let input = container.querySelector('input');
  input.textContent = expectedWriting;

  input = await waitForElement(() =>
    getByText(expectedWriting)
  );
});