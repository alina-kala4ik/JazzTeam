import history from "./history";
import {PATCHES, getCookie} from "./utils";

const initialState = {
  loginError: false,
  user: null
}

const ACTIONS = {
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
  SET_USER_DATA: 'SET_USER_DATA'
}

const operation = {
  login: (data) => (dispatch, getState, api) => {
    api.post('/login', data)
      .then(response => {
        if (response.status === 400) {
          dispatch({
            type: ACTIONS.SET_LOGIN_ERROR,
            payload: true
          })
          return;
        }
        if (response.status === 200) {
          const {data} = response;

          document.cookie = `token=${data.accessToken}`;

          dispatch({
            type: ACTIONS.SET_USER_DATA,
            payload: data.user
          })
          dispatch({
            type: ACTIONS.SET_LOGIN_ERROR,
            payload: false
          })
        }
      })
      .then(() => history.push(PATCHES.PROFILE))
  },
  getUserData: () => (dispatch, getState, api) => {
    const token = getCookie('token');
    api.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.status === 200) {
          const {data} = response;
          dispatch({
            type: ACTIONS.SET_USER_DATA,
            payload: data[0]
          })
        }
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGIN_ERROR:
      return Object.assign({}, state, {loginError: action.payload})
    case ACTIONS.SET_USER_DATA:
      return Object.assign({}, state, {user: action.payload})
    default:
      return state;
  }
}

export {ACTIONS, reducer, operation};
