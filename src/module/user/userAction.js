import { login } from './userService';

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_PENDING' });
    // issue axios request to login api
    const response = await login(email, password);
    // save jwt token inside local storage
    window.localStorage.setItem('bookstore-token', response.data.token);
    // dispatch redux action
    dispatch({
      type: 'USER_LOGIN',
      payload: response.data,
    });
    dispatch({ type: 'USER_SUCCESS' });
  } catch {
    dispatch({ type: 'USER_ERROR' });
  }
};