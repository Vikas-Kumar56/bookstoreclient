import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import Login from '../Login';
import { fireEvent, wait } from '@testing-library/dom';
import { loginAction } from '../../../module/user/userAction';

jest.mock('../../../module/user/userAction');

describe('Login form test', () => {
  it('should show required error message for email and password', async () => {
    const { findByText } = renderWithRedux(<Login />, {});

    const submitButton = await findByText('Login');
    fireEvent.submit(submitButton);

    expect(await findByText('Password is required')).toBeInTheDocument();
    expect(await findByText('Email is required')).toBeInTheDocument();
  });

  it('should show email and password validation message', async () => {
    const { findByText, getByLabelText } = renderWithRedux(<Login />, {});

    const paswordField = getByLabelText('Enter password');
    const emailField = getByLabelText('Enter email address');

    fireEvent.change(paswordField, { target: { value: 'wrong' } });
    fireEvent.change(emailField, { target: { value: 'wrong email' } });

    const submitButton = await findByText('Login');
    fireEvent.submit(submitButton);

    expect(
      await findByText('Password should be of minimum 8 char length')
    ).toBeInTheDocument();
    expect(await findByText('Enter a valid email')).toBeInTheDocument();
  });

  it('should call login action when email and password is valid', async () => {
    const { findByText, getByLabelText } = renderWithRedux(<Login />, {});
    loginAction.mockImplementation(() => (dispatch) => {});

    const paswordField = getByLabelText('Enter password');
    const emailField = getByLabelText('Enter email address');

    fireEvent.change(paswordField, { target: { value: 'validPassword' } });
    fireEvent.change(emailField, { target: { value: 'valid@gamil.com' } });

    const submitButton = await findByText('Login');
    fireEvent.submit(submitButton);

    await wait(() => {
      expect(loginAction).toHaveBeenCalledWith(
        'valid@gamil.com',
        'validPassword'
      );
    });
  });
});
