import React from 'react';
import ReactDOM from 'react-dom';
import {render, waitForElement, fireEvent} from 'react-testing-library';
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

it('appends to existing writing', async () => {
  const existingWriting = getlorem.sentences(5);
  const newWriting = getlorem.words(5);
  const expectedWriting = existingWriting + newWriting
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper durabilityRating={expectedWriting.length}/>, div);

  let textarea = container.querySelector('textarea');
  fireEvent.change(textarea, {target: {value: existingWriting}});

  fireEvent.change(textarea, {target: {value: expectedWriting}});

  await waitForElement(() =>
    getByText(expectedWriting)
  );
});

it('renders only space characters when pencil used up by lowercase letters', async () => {
  const givenWriting = 'pqwxy';
  const expectedWriting = 'pqwx ';
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper />, div);

  let textarea = container.querySelector('textarea');
  fireEvent.change(textarea, {target: {value: givenWriting}});

  await waitForElement(() =>
    getByText(expectedWriting, {collapseWhitespace: false, trim: false})
  );
});

it('renders only space characters when pencil used up by uppercase letters', async () => {
  const givenWriting = 'PQW';
  const expectedWriting = 'PQ ';
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper />, div);

  let textarea = container.querySelector('textarea');
  fireEvent.change(textarea, {target: {value: givenWriting}});

  await waitForElement(() =>
    getByText(expectedWriting, {collapseWhitespace: false, trim: false})
  );
});

it('maintains point given space characters', async () => {
  const givenWriting = `vw  
  x y`;
  const expectedWriting = `vw  
  x y`;
  const div = document.createElement('div');
  const {container, getByText} = render(<Paper />, div);

  let textarea = container.querySelector('textarea');
  fireEvent.change(textarea, {target: {value: givenWriting}});

  await waitForElement(() =>
    getByText(expectedWriting, {collapseWhitespace: false, trim: false})
  );
});

it('Sharpens to orginal durabilityRating', async () => {
  const givenWriting = getlorem.words(1).toLowerCase();
  const expectedUse = givenWriting.length;
  const durabilityRating = 50;

  const div = document.createElement('div');
  const {container, getByTestId} = render(<Paper durabilityRating={durabilityRating}/>, div);

  const textarea = container.querySelector('textarea');
  fireEvent.change(textarea, {target: {value: givenWriting}});

  const progressBefore = await waitForElement(() =>
    getByTestId('point-progress')
  );
  expect(progressBefore.getAttribute('value')).toEqual(String(durabilityRating - expectedUse));

  let sharpenButton = container.querySelector('button');
  fireEvent.click(sharpenButton);

  const progressAfter = await waitForElement(() =>
    getByTestId('point-progress')
  );
  expect(progressAfter.getAttribute('value')).toEqual(String(durabilityRating));
});


