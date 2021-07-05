import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import registerStyle from './RegisterStyle';
import { regsiterAction } from '../../module/user/userAction';
import { getUserRegisterPromise } from '../../module/user/userSelector';
import { useSnackbar } from 'notistack';

const validationSchema = yup.object({
  name: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 char length'),
});

const Register = () => {
  const classes = registerStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const userPromise = useSelector(getUserRegisterPromise);

  const registerForm = useFormik({
    initialValues: { email: '', password: '', name: '' },
    validationSchema,
    onSubmit: (values) => {
      dispatch(regsiterAction(values));
    },
  });

  useEffect(() => {
    if (userPromise.isErrorOcurred) {
      enqueueSnackbar('Server error.', {
        variant: 'error',
      });
    } else if (userPromise.isFulfilled) {
      enqueueSnackbar('User register successfully!', {
        variant: 'success',
      });
      history.push('/login');
    }
  }, [history, userPromise, enqueueSnackbar]);

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.heading}>User Registration</Typography>
      <form noValidate autoComplete='off' onSubmit={registerForm.handleSubmit}>
        <Paper className={classes.paper}>
          <TextField
            className={classes.margin12}
            id='name'
            name='name'
            variant='outlined'
            placeholder='Enter username'
            label='Enter username'
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            helperText={registerForm.touched.name && registerForm.errors.name}
            error={
              registerForm.touched.name && Boolean(registerForm.errors.name)
            }
          />
          <TextField
            className={classes.margin12}
            id='email'
            name='email'
            variant='outlined'
            placeholder='Enter email address'
            label='Enter email address'
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            helperText={registerForm.touched.email && registerForm.errors.email}
            error={
              registerForm.touched.email && Boolean(registerForm.errors.email)
            }
          />
          <TextField
            className={classes.margin12}
            id='password'
            name='password'
            variant='outlined'
            placeholder='Enter password'
            label='Enter password'
            type='password'
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            helperText={
              registerForm.touched.password && registerForm.errors.password
            }
            error={
              registerForm.touched.password &&
              Boolean(registerForm.errors.password)
            }
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            disabled={userPromise.isPending}
          >
            Register
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default Register;
