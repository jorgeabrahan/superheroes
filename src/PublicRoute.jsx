import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from './auth';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { authState } = useContext(AuthContext)
  return authState?.logged ? <Navigate to='/marvel' /> : children
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
