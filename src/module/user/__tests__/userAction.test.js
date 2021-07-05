import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import { loginAction } from '../userAction';

jest.mock('axios');
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);

describe('login action', () => {
  beforeEach(() => {
    axios.post.mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'jwt token',
        },
      });
    });
  });

  it('should able to dispatch and save in local storage', async () => {
    const store = mockStore({});

    await store.dispatch(loginAction('email', 'password'));
    const actions = store.getActions();

    expect(actions.length).toEqual(3);
    expect(actions[1]).toEqual({
      type: 'USER_LOGIN',
      payload: {
        token: 'jwt token',
      },
    });
  });
});
