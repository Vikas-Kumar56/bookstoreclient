import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksAction } from '../../module/book/bookAction';
import {
  getBooksSelector,
  getBookPromiseSelector,
} from '../../module/book/bookSelector';
import BookFilter from './BookFilter';
import styles from './BookStyles';
import BookList from './BookList';

const BookContainer = () => {
  console.log('called');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);
  const books = useSelector(getBooksSelector);
  const bookPromise = useSelector(getBookPromiseSelector);

  const classes = styles();
  return (
    <Box className={classes.bookContainer}>
      <BookFilter />
      <Box className={classes.bookList}>
        {bookPromise.isPending && (
          <Box ml={5}>
            <Skeleton
              data-testid='book-loader'
              variant='rect'
              animation='pulse'
              width='80%'
              height={200}
            />
          </Box>
        )}
        {bookPromise.isErrorOcurred && (
          <div data-testid='book-error-messsage'> Error message .. </div>
        )}
        {bookPromise.isFulfilled && <BookList books={books} />}
      </Box>
    </Box>
  );
};

export default BookContainer;
