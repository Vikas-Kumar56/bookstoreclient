import { makeStyles, createStyles } from '@material-ui/core';

export default makeStyles(() =>
  createStyles({
    bookContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    bookFilter: {
      width: '20%',
      height: '500px',
    },
    bookFilterPaper: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
    },
    bookList: {
      width: '80%',
    },
    bookListItemPaper: {
      padding: '10px',
      display: 'flex',
      width: '80%',
    },
    bookImage: {
      width: '180px',
      height: '200px',
    },
  })
);
