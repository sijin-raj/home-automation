import { userConstants } from '../../_constants';
import { userService } from '../../_services/user/user.service';

const initialState = () => {
  const storedUser = userService.getCurrentUser();
  return {
    name: storedUser && storedUser.user && storedUser.user.name ? storedUser.user.name : null,
    email: storedUser && storedUser.user && storedUser.user.email ? storedUser.user.email : null,
    remember: false,
    isLoggedIn: !!(storedUser && storedUser.user && storedUser.tokens),
    isFetching: false,
    tokens: storedUser && storedUser.tokens ? storedUser.tokens : {},
    loginError: null,
    isAuthorized: null,
  };
};

const user = (state = initialState(), action) => {
  switch (action.type) {
    case userConstants.SET_USER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        remember: action.payload.remember,
        isLoggedIn: true,
        isFetching: false,
        tokens: action.payload.tokens,
        loginError: null,
        isAuthorized: true,
      };
    case userConstants.SET_USER_TOKENS:
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
        tokens: action.payload.tokens,
        loginError: null,
        isAuthorized: false,
      };
    case userConstants.SIGN_IN:
      return {
        ...state,
        isFetching: true,
        loginError: null,
      };
    case userConstants.SIGN_OUT:
      return {
        name: null,
        email: null,
        remember: null,
        isLoggedIn: false,
        isFetching: false,
        tokens: null,
        loginError: null,
        isAuthorized: false,
      };
    case userConstants.GET_ME:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        isFetching: false,
        loginError: null,
        isAuthorized: true,
      };
    case userConstants.SET_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        loginError: action.payload.error,
        isAuthorized: false,
      };
    default:
      return state;
  }
};

export default user;
