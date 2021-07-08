import React, { useEffect } from 'react';
import { Typography, Box, Paper, TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../module/user/userAction';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import registerStyel from './RegisterStyle';
import { getUserRegisterPromise } from '../../module/user/userSelector';

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
  const classes = registerStyel();
  const dispatch = useDispatch();
  const registerPromise = useSelector(getUserRegisterPromise);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (registerPromise.isErrorOcurred) {
      enqueueSnackbar('Server error occured!', {
        variant: 'error',
      });
    } else if (registerPromise.isFulfilled) {
      enqueueSnackbar('User Added Successfully!', {
        variant: 'success',
      });
      history.push('/login');
      // dispatch action to set register promise values
    }
  }, [registerPromise, enqueueSnackbar, history]);

  const registerForm = useFormik({
    validationSchema,
    initialValues: { email: '', password: '', name: '' },
    onSubmit: (values) => {
      dispatch(registerAction(values));
    },
  });
  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.heading}>User Registration </Typography>
      <form autoComplete='off' noValidate onSubmit={registerForm.handleSubmit}>
        <Paper className={classes.paper}>
          <TextField
            className={classes.margin12}
            id='name'
            name='name'
            variant='outlined'
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
            label='Enter password'
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
            type='submit'
            variant='contained'
            color='primary'
          >
            Register
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default Register;
