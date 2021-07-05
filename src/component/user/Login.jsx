import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import makeStyle from './LoginStyle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../module/user/userAction';
import { getUserPromise } from '../../module/user/userSelector';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 char length')
    .required('Password is required'),
});

const Login = () => {
  const classes = makeStyle();
  const dispatch = useDispatch();
  const loginPromise = useSelector(getUserPromise);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    if (loginPromise.isErrorOcurred) {
      enqueueSnackbar('Userrname and password wrong!', {
        variant: 'error',
      });
    } else if (loginPromise.isFulfilled) {
      enqueueSnackbar('Login Success', {
        variant: 'success',
      });
      history.push('/');
    }
  }, [loginPromise, enqueueSnackbar, history]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginAction(values.email, values.password));
    },
  });

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
      <Box className={classes.wrapper}>
        <Paper className={classes.paper}>
          <Typography variant='h4'>Book store Login</Typography>
          <TextField
            className={classes.topMargin}
            name='email'
            id='email'
            data-testid='email-testid'
            label='Enter email address'
            variant='outlined'
            placeholder='Enter email address'
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            className={classes.topMargin}
            name='password'
            id='password'
            data-testid='password-testid'
            label='Enter password'
            variant='outlined'
            placeholder='Enter password'
            value={formik.values.password}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <Button
            className={classes.topMargin}
            type='submit'
            variant='contained'
            color='primary'
            disabled={loginPromise.isPending}
          >
            Login
          </Button>
          <br />
          <Link component='button' variant='body2' onClick={handleRegister}>
            Register
          </Link>
        </Paper>
      </Box>
    </form>
  );
};

export default Login;
