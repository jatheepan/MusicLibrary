import { combineReducers } from 'redux';
import {
  SONGS_WILL_FETCH,
  SONGS_DID_FETCH,
  SONGS_FETCH_ERROR,
  SORT_SONGS,
  UPDATE_SEARCH_QUERY,
  ALBUMS_WILL_FETCH,
  ALBUMS_DID_FETCH,
  ALBUMS_FETCH_ERROR,
  PAGE_CHANGE
} from './actions';

function songsReducer(initialState = {
  songs: [],
  sort: {property: 'title', direction: 'asc'},
}, {type, payload}) {
  const state = {};
  switch(type) {
    case SONGS_DID_FETCH:
      state.songs = payload;
      break;

    case SONGS_FETCH_ERROR:
      state.error = payload;
      break;

    case SORT_SONGS:
      state.sort = Object.assign({}, payload);
      break;

    default:
  }

  return Object.assign({}, initialState, state);
}

function albumReducer(initialState = {albums: []}, {type, payload}) {
  const state = {};
  switch(type) {
    case ALBUMS_DID_FETCH:
      state.albums = payload;
      break;

    case ALBUMS_FETCH_ERROR:
      state.error = payload;
      break;

    default:
  }

  return Object.assign({}, initialState, state);
}

function globalReducer(initialState = {query: '', loading: false, activePage: 'songs'}, {type, payload}) {
  const state = {};
  switch(type) {
    case SONGS_WILL_FETCH:
    case ALBUMS_WILL_FETCH:
      state.loading = true;
      break;

    case UPDATE_SEARCH_QUERY:
      state.query = payload;
      break;

    case SONGS_DID_FETCH:
    case SONGS_FETCH_ERROR:
    case ALBUMS_DID_FETCH:
    case ALBUMS_FETCH_ERROR:
      state.loading = false;
      break;

    case PAGE_CHANGE:
      state.activePage = payload;
      break;
    default:
  }
  return Object.assign({}, initialState, state);
}

function playListReducer(initialState = {songs: [], currentSong: null}, {type, payload}) {
  const state = {};

  return Object.assign({}, initialState, state);
}

export default combineReducers({
  global: globalReducer,
  songsList: songsReducer,
  albumList: albumReducer,
  playList: playListReducer
});
