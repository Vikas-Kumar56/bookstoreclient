import { getBooksService, getBooksByTitleService } from './bookService';

export const getBooksByTitle = (title) => async (dispatch) => {
  try {
    console.log(title);
    dispatch({ type: 'BOOKLISTPENDING' });
    const books = await getBooksByTitleService(title);
    dispatch({
      type: 'BOOKSBYTITLE',
      payload: books.data,
    });
    dispatch({ type: 'BOOKLISTFULFILLED' });
  } catch (error) {
    dispatch({ type: 'BOOKLISTERROR' });
  }
};

export const getBooksAction = () => async (dispatch) => {
  try {
    dispatch({ type: 'BOOKLISTPENDING' });
    const books = await getBooksService();
    dispatch({
      type: 'BOOKLIST',
      payload: books.data,
    });
    dispatch({ type: 'BOOKLISTFULFILLED' });
  } catch (error) {
    dispatch({ type: 'BOOKLISTERROR' });
  }
};
