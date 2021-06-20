import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import BookFilter from '../BookFilter';
import { fireEvent } from '@testing-library/dom';
import { getBooksByTitle } from '../../../module/book/bookAction';

jest.mock('../../../module/book/bookAction');
describe('BookFilter', () => {
  it('should fire getBooksByTiitle action on click of search button', () => {
    const { getByLabelText, getByText } = renderWithRedux(<BookFilter />, {});
    getBooksByTitle.mockImplementation(() => (dispatch) => {});

    const textField = getByLabelText('Enter book title');
    fireEvent.change(textField, { target: { value: 'test title' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    expect(getBooksByTitle).toHaveBeenCalledWith('test title');
  });
});
