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
  PLAYLIST_WILL_FETCH,
  PLAYLIST_DID_FETCH,
  PLAYLIST_FETCH_ERROR,
  PLAYLIST_CHANGE_CURRENT_SONG,
  PLAYLIST_PLAY_NEXT_SONG,
  ADD_TO_PLAYLIST,
  PLAYER_STATUS_UPDATE,
  REPLACE_PLAYLIST
} from './actions';

/**
 * Songs Reducer
 * @param initialState
 * @param type
 * @param payload
 * @returns {Object}
 */
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

/**
 * Album Reducer.
 * @param initialState
 * @param type
 * @param payload
 * @returns {Object}
 */
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

/**
 * Global Reducer.
 * @param initialState
 * @param type
 * @param payload
 * @returns {Object}
 */
function globalReducer(initialState = {query: '', loading: false}, {type, payload}) {
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
    default:
  }
  return Object.assign({}, initialState, state);
}

/**
 * Playlist Reducer.
 * @param initialState
 * @param type
 * @param payload
 * @returns {Object}
 */
function playListReducer(initialState = {songs: [], currentSong: null, loading: false}, {type, payload}) {
  const state = {};
  switch(type) {
    case PLAYLIST_WILL_FETCH:
      state.loading = true;
      break;

    case PLAYLIST_DID_FETCH:
      state.loading = false;
      state.songs = payload;
      break;

    case PLAYLIST_FETCH_ERROR:
      state.loading = false;
      break;

    case PLAYLIST_CHANGE_CURRENT_SONG:
      state.currentSong = payload;
      break;

    case PLAYLIST_PLAY_NEXT_SONG:
      const songs = initialState.songs;
      const currentSong = initialState.currentSong;
      const currentSongIndex = songs.findIndex(({song_id}) => song_id === currentSong.song_id);
      if(currentSongIndex < songs.length) {
        state.currentSong = songs[currentSongIndex + 1];
      } else {
        state.currentSong = null;
      }
      break;

    case ADD_TO_PLAYLIST:
      state.songs = [].concat(initialState.songs);
      state.songs.push({
        song_id: payload.id,
        song: payload
      });
      break;

    case REPLACE_PLAYLIST:
      state.songs = payload;
      state.currentSong = state.songs.length ? state.songs[0] : null;
      break;

    default:
  }
  return Object.assign({}, initialState, state);
}

/**
 * Player Status Reducer.
 * @param initialState
 * @param type
 * @param payload
 * @returns {*}
 */
function playerStatusReducer(initialState = {status: null}, {type, payload}) {
  let state = {};
  if(type === PLAYER_STATUS_UPDATE) {
    state.status = payload;
  }
  if(type === REPLACE_PLAYLIST) {
    state.status = 'playing';
  }
  return Object.assign({}, initialState, state);
}

export default combineReducers({
  global: globalReducer,
  songsList: songsReducer,
  albumList: albumReducer,
  playlist: playListReducer,
  player: playerStatusReducer
});
