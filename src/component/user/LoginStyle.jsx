import { makeStyles, createStyles } from '@material-ui/core';

export default makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    },
    topMargin: {
      marginTop: '2rem',
    },
  })
);
