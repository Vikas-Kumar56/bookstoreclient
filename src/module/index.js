import { combineReducers } from 'redux';
import bookReducer from './book/bookReducer';
import userReducer from './user/userReducer';

export default combineReducers({
  bookReducer,
  user: userReducer,
});
