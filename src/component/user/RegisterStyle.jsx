import { makeStyles, createStyles } from '@material-ui/core';

export default makeStyles(() =>
  createStyles({
    wrapper: {
      margin: 'auto',
      width: '40%',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    },
    margin12: {
      margin: '12px',
    },
    heading: {
      fontSize: 'larger',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
      width: '25%',
      margin: '12px auto',
    },
  })
);
