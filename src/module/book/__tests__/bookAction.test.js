import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import { getBooksAction, getBooksByTitle } from '../bookAction';

jest.mock('axios');
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);

describe('BookActions', () => {
  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: 'test title',
            description: 'des',
            releaseYear: 2018,
          },
        ],
      })
    );
  });

  it('should able to dispatch success action', async () => {
    const store = mockStore({});
    await store.dispatch(getBooksAction());
    const actions = store.getActions();
    expect(actions.length).toEqual(3);
    expect(actions[1]).toEqual({
      type: 'BOOKLIST',
      payload: [
        {
          id: 1,
          title: 'test title',
          description: 'des',
          releaseYear: 2018,
        },
      ],
    });
  });

  it('shoudl able to dispatch bookbytitle action', async () => {
    const store = mockStore({});
    await store.dispatch(getBooksByTitle('test title'));

    const actions = store.getActions();

    expect(actions.length).toEqual(3);
    expect(actions[1]).toEqual({
      type: 'BOOKSBYTITLE',
      payload: [
        {
          id: 1,
          title: 'test title',
          description: 'des',
          releaseYear: 2018,
        },
      ],
    });
  });

  it('should able to dispatch error action', async () => {
    const store = mockStore({});
    axios.get.mockImplementation(() => {
      throw new Error();
    });

    await store.dispatch(getBooksByTitle('test title'));

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[1]).toEqual({
      type: 'BOOKLISTERROR',
    });
  });
});
