import React from 'react';
import ReactDOM from 'react-dom';
import {render, waitForElement, fireEvent} from 'react-testing-library';
import getlorem from 'getlorem';
import Paper from './Paper';
import Pencil from './Pencil';

jest.mock('./Pencil', () => {
  const Pencil = jest.fn((props) => <div 
    data-used={props.used}
    onClick={props.handleClick}
    data-durability-rating={props.durabilityRating}>
    Pencil</div>);

  return Pencil;
});

describe('Paper behavior', () => {
  beforeEach(() => {
    Pencil.mockClear();
  });

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
    const expectedDurabilityRatingAfterSharpen = durabilityRating * 2;

    const div = document.createElement('div');
    const {container} = render(<Paper durabilityRating={durabilityRating}/>, div);

    const textarea = container.querySelector('textarea');
    fireEvent.change(textarea, {target: {value: givenWriting}});

    expect(Pencil).toHaveBeenCalledWith({
      durabilityRating,
      handleClick: expect.any(Function),  
      used: expectedUse}, {});

    let sharpenButton = container.querySelector('button');
    fireEvent.click(sharpenButton);

    expect(Pencil).toHaveBeenCalledWith({
      durabilityRating: expectedDurabilityRatingAfterSharpen,
      handleClick: expect.any(Function),  
      used: 0}, {});
  });

  it('Sharpening reduces length by one', async () => {
    const givenPencilLength = 1;
    const div = document.createElement('div');
    
    const {container, getByText} = render(<Paper length={givenPencilLength}/>, div); 
    const sharpenButton = container.querySelector('button');
    fireEvent.click(sharpenButton);

    const maybeDisabledButton = await waitForElement(() =>
      getByText('Sharpen')
    );
    expect(maybeDisabledButton.disabled).toBeTruthy();
  });

  it('Allows further writing after sharpening', async () => {
    const givenWriting = 'abcde';
    const expectedWriting = 'abcdefgh';

    const div = document.createElement('div');
    const {container, getByText} = render(<Paper />, div);

    const textarea = container.querySelector('textarea');
    fireEvent.change(textarea, {target: {value: givenWriting}});
    
    const sharpenButton = container.querySelector('button');
    fireEvent.click(sharpenButton);

    fireEvent.change(textarea, {target: {value: expectedWriting}});

    await waitForElement(() =>
      getByText(expectedWriting, {collapseWhitespace: false, trim: false})
    );
  });


  it('Replaces last occurance of erased content with it\'s length in spaces', async () => {
    const givenWriting = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?';
    const erasedWriting = 'chuck';
    const expectedWriting = 'How much wood would a woodchuck chuck if a woodchuck could       wood?';
    const div = document.createElement('div');
    
    const {container, getByText} = render(<Paper durabilityRating={givenWriting.length}/>, div);

    const textarea = container.querySelector('textarea');
    fireEvent.change(textarea, {target: {value: givenWriting}});
    const textAreaFound = await waitForElement(() =>
      getByText(givenWriting)
    );
    expect(textAreaFound.value).toHaveLength(givenWriting.length);

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 20
    });

    Pencil.mock.calls[0][0].handleClick(evt, erasedWriting);

    await waitForElement(() =>
      getByText(expectedWriting, {collapseWhitespace: false})
    );
  });

});
