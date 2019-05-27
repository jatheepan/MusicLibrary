import { combineReducers } from 'redux';
import {
  SONGS_WILL_FETCH,
  SONGS_DID_FETCH,
  SONGS_FETCH_ERROR,
  SORT_LIBRARY
} from './actions';

function libraryReducer(initialState = {songs: [], sort: {property: 'title', direction: 'asc'}}, {type, payload}) {
  const state = {};
  switch(type) {
    case SONGS_WILL_FETCH:
      state.loading = true;
      break;

    case SONGS_DID_FETCH:
      state.loading = false;
      state.songs = payload;
      break;

    case SONGS_FETCH_ERROR:
      state.loading = false;
      state.error = payload;
      break;

    case SORT_LIBRARY:
      state.sort = payload;
      break;

    default:
  }

  return Object.assign({}, initialState, state);
}

export default combineReducers({
  library: libraryReducer
});