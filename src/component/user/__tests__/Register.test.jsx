import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import Register from '../Register';
import { fireEvent, wait } from '@testing-library/dom';
import { registerAction } from '../../../module/user/userAction';

jest.mock('../../../module/user/userAction');
describe('Register form', () => {
  it('should exist name ,email, password field and register btn', () => {
    const { getByLabelText, getByText } = renderWithRedux(<Register />, {});

    expect(getByLabelText('Enter email address')).toBeInTheDocument();
    expect(getByLabelText('Enter password')).toBeInTheDocument();
    expect(getByLabelText('Enter username')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('should show required error message when register is clicked', async () => {
    const { findByText, getByText } = renderWithRedux(<Register />, {});

    // submit register form
    fireEvent.submit(getByText('Register'));

    expect(await findByText('Email is required')).toBeInTheDocument();
    expect(await findByText('Password is required')).toBeInTheDocument();
    expect(await findByText('Username is required')).toBeInTheDocument();
  });

  it('should show email, password invalid error message', async () => {
    const { findByText, getByText, getByLabelText } = renderWithRedux(
      <Register />,
      {}
    );

    fireEvent.change(getByLabelText('Enter email address'), {
      target: { value: 'invalid email' },
    });
    fireEvent.change(getByLabelText('Enter password'), {
      target: { value: 'pass' },
    });
    fireEvent.change(getByLabelText('Enter username'), {
      target: { value: 'username' },
    });

    // submit register form
    fireEvent.submit(getByText('Register'));

    expect(await findByText('Enter a valid email')).toBeInTheDocument();
    expect(
      await findByText('Password should be of minimum 8 char length')
    ).toBeInTheDocument();
  });

  it('should call register action with user data', async () => {
    const { getByText, getByLabelText } = renderWithRedux(<Register />, {});
    registerAction.mockImplementation(() => (dispatch) => {});

    fireEvent.change(getByLabelText('Enter email address'), {
      target: { value: 'email@gmail.com' },
    });
    fireEvent.change(getByLabelText('Enter password'), {
      target: { value: 'password8' },
    });
    fireEvent.change(getByLabelText('Enter username'), {
      target: { value: 'username' },
    });

    // submit register form
    fireEvent.submit(getByText('Register'));

    await wait(() => {
      expect(registerAction).toHaveBeenCalledWith({
        name: 'username',
        email: 'email@gmail.com',
        password: 'password8',
      });
    });
  });
});
