import history from "./history";
import {PATCHES, getCookie} from "./utils";

const initialState = {
  loginError: false,
  user: null,
  contacts: null,
  headers: null
}

const ACTIONS = {
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_CONTACTS: 'SET_CONTACTS',
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
  },
  loadContacts: () => (dispatch, getState, api) => {
    const token = getCookie('token');
    Promise.all([
      api.get('/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      api.get('/headers', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
      .then(responses => {
        if (responses.every(response => response.status === 200)) {
          const contacts = responses[0].data;
          const headers = responses[1].data;
          dispatch({
            type: ACTIONS.SET_CONTACTS,
            payload: {contacts, headers}
          })
        }
      })
  },
  editContact: (data) => (dispatch, getState, api) => {
    const token = getCookie('token');
    api.put(`/contacts/${data.id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        dispatch(operation.loadContacts())
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGIN_ERROR:
      return Object.assign({}, state, {loginError: action.payload})
    case ACTIONS.SET_USER_DATA:
      return Object.assign({}, state, {user: action.payload})
    case ACTIONS.SET_CONTACTS:
      return  Object.assign({}, state, {contacts: action.payload.contacts}, {headers: action.payload.headers})
    default:
      return state;
  }
}

export {ACTIONS, reducer, operation};
