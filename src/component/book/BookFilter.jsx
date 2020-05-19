import React from "react";
import { Paper, Box } from "@material-ui/core";
import styles from "./BookStyles";

const BookFilter = () => {
  const classes = styles();
  return (
    <Box className={classes.bookFilter}>
      <Paper className={classes.bookFilterPaper}>book filter</Paper>
    </Box>
  );
};

export default BookFilter;
