import getBooksService from './bookService';

const getBooksAction = () => async (dispatch) => {
    try{
        dispatch({ type: 'BOOKLISTPENDING' });
        const books = await getBooksService();
        dispatch({
            type: 'BOOKLIST',
            payload: books.data
        });
        dispatch({ type: 'BOOKLISTFULFILLED' });
    } catch(error) {
        dispatch({ type: 'BOOKLISTERROR' });
    }
}

export default getBooksAction;