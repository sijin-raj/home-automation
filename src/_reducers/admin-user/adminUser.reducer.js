import { adminUserConstants } from '../../_constants';

const initialState = {
  isFetchingUsersList: false,
  fetchedUsersList: false,
  users: [],
  user: {},
  fetchedEditableUser: false,
  userInProgress: false,
  count: 0,
};

const adminUser = (state = initialState, action) => {
  switch (action.type) {
    case adminUserConstants.STORE_USERS:
      return {
        ...state,
        users: action.payload.users,
        count: action.payload.count,
      };

    case adminUserConstants.SET_FETCHING_USERS:
      return {
        ...state,
        isFetchingUsersList: action.payload,
      };

    case adminUserConstants.SET_FETCHED_USERS:
      return {
        ...state,
        fetchedUsersList: action.payload,
      };

    case adminUserConstants.STORE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case adminUserConstants.SET_FETCHED_EDITABLE_USER:
      return {
        ...state,
        fetchedEditableUser: action.payload,
      };

    case adminUserConstants.SET_USER_PROGRESS:
      return {
        ...state,
        userInProgress: action.payload,
      };

    case adminUserConstants.CLEAR_USER:
      return {
        ...state,
        fetchedEditableUser: false,
        user: {},
      };

    case adminUserConstants.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };

    case adminUserConstants.SET_USER_TO_BE_DELETED:
      const users = [];
      state.users.forEach(user => {
        if (user.id === action.payload) {
          user.toBeDeleted = true;
        }
        users.push(user);
      });

      return {
        ...state,
        users,
      };

    case adminUserConstants.UNSET_USER_TO_BE_DELETED:
      const resetUsers = [];
      state.users.forEach(user => {
        if (user.id === action.payload) {
          user.toBeDeleted = false;
        }
        resetUsers.push(user);
      });

      return {
        ...state,
        users: resetUsers,
      };

    default:
      return state;
  }
};

export default adminUser;
