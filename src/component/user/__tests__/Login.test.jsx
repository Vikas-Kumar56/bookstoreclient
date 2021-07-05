import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import Login from '../Login';
import { fireEvent, wait } from '@testing-library/dom';
import { loginAction } from '../../../module/user/userAction';

jest.mock('../../../module/user/userAction');

describe('Login test', () => {
  it('should show required error message for email and password', async () => {
    const { findByText } = renderWithRedux(<Login />, {});

    const submitBtn = await findByText('Login');
    fireEvent.submit(submitBtn);

    expect(await findByText('Email is required')).toBeInTheDocument();
    expect(await findByText('Password is required')).toBeInTheDocument();
  });

  it('should show email and password invalid error message', async () => {
    const { findByText, getByLabelText } = renderWithRedux(<Login />, {});

    const passwordField = getByLabelText('Enter password');
    const emailField = getByLabelText('Enter email address');

    fireEvent.change(passwordField, { target: { value: 'wrongP' } });
    fireEvent.change(emailField, { target: { value: 'email invalid' } });

    const submitBtn = await findByText('Login');
    fireEvent.submit(submitBtn);

    expect(await findByText('Enter a valid email')).toBeInTheDocument();
    expect(
      await findByText('Password should be of minimum 8 char length')
    ).toBeInTheDocument();
  });

  it('should call login action when email and password is valid', async () => {
    const { findByText, getByLabelText } = renderWithRedux(<Login />, {});
    loginAction.mockImplementation(() => (dispatch) => {});

    const passwordField = getByLabelText('Enter password');
    const emailField = getByLabelText('Enter email address');

    fireEvent.change(passwordField, { target: { value: 'passwordvalid' } });
    fireEvent.change(emailField, { target: { value: 'email@gmail.com' } });

    const submitBtn = await findByText('Login');
    fireEvent.submit(submitBtn);

    await wait(() => {
      expect(loginAction).toHaveBeenCalledWith(
        'email@gmail.com',
        'passwordvalid'
      );
    });
  });
});
