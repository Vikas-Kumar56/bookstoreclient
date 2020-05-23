import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import getBooksAction from "../../module/book/bookAction";
import { getBooksSelector } from "../../module/book/bookSelector";
import BookFilter from "./BookFilter";
import styles from "./BookStyles";
import BookList from "./BookList";

const BookContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);
  const books = useSelector(getBooksSelector);
  console.log(books);
  const classes = styles();
  return (
    <Box className={classes.bookContainer}>
      <BookFilter />
      <Box className={classes.bookList}>
        <BookList books={books} />
      </Box>
    </Box>
  );
};

export default BookContainer;
