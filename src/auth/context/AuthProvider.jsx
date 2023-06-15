import { useReducer, useMemo, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import PropTypes from 'prop-types';
import { types } from "../types/types";

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return {
    logged: !!user,
    user
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init)

  const onLogin = useCallback((name = '') => {
    const user = { id: '123', name }
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: types.login, payload: user })
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem('user')
    dispatch({ type: types.logout, payload: null })
  }, []);

  const providerValue = useMemo(() => ({
    authState,
    login: onLogin,
    logout: onLogout
  }), [authState, onLogin, onLogout]);

  return (
    <AuthContext.Provider value={providerValue}>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
