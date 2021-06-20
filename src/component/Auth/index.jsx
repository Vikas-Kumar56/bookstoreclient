import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserToken } from '../../module/user/userSelector';

const Auth = ({ children }) => {
  const history = useHistory();
  const token = useSelector(getUserToken);

  const getView = () => {
    if (!token) {
      history.push('/login');
    }

    return children;
  };

  return <>{getView()}</>;
};

export default Auth;
