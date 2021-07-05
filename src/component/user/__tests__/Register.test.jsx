import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import Register from '../Register';
import { fireEvent, wait } from '@testing-library/dom';
import { regsiterAction } from '../../../module/user/userAction';

jest.mock('../../../module/user/userAction');
describe('Register form test', () => {
  it('should verify name , email, password field is present', () => {
    const { getByLabelText, getByText } = renderWithRedux(<Register />, {});

    expect(getByLabelText('Enter email address')).toBeInTheDocument();
    expect(getByLabelText('Enter password')).toBeInTheDocument();
    expect(getByLabelText('Enter username')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('should show required validation when email,password,username fields are empty', async () => {
    const { getByText, findByText } = renderWithRedux(<Register />, {});

    const registerBtn = getByText('Register');
    fireEvent.submit(registerBtn);

    expect(await findByText('Email is required')).toBeInTheDocument();
    expect(await findByText('Password is required')).toBeInTheDocument();
    expect(await findByText('Username is required')).toBeInTheDocument();
  });

  it('should show email and password invalid error messages', async () => {
    const { getByText, findByText, getByLabelText } = renderWithRedux(
      <Register />,
      {}
    );

    fireEvent.change(getByLabelText('Enter email address'), {
      target: { value: 'email' },
    });
    fireEvent.change(getByLabelText('Enter password'), {
      target: { value: 'pass' },
    });
    fireEvent.change(getByLabelText('Enter username'), {
      target: { value: 'username' },
    });

    const registerBtn = getByText('Register');
    fireEvent.submit(registerBtn);

    expect(await findByText('Enter a valid email')).toBeInTheDocument();
    expect(
      await findByText('Password should be of minimum 8 char length')
    ).toBeInTheDocument();
  });

  it('should call register dispatch when data is correct', async () => {
    const { getByText, getByLabelText } = renderWithRedux(<Register />, {});
    regsiterAction.mockImplementation(() => (dispatch) => {});

    fireEvent.change(getByLabelText('Enter email address'), {
      target: { value: 'email@gmail.com' },
    });
    fireEvent.change(getByLabelText('Enter password'), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText('Enter username'), {
      target: { value: 'username' },
    });

    const registerBtn = getByText('Register');
    fireEvent.submit(registerBtn);

    await wait(() => {
      expect(regsiterAction).toHaveBeenCalledWith({
        name: 'username',
        password: 'password',
        email: 'email@gmail.com',
      });
    });
  });
});
