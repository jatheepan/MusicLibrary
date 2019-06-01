import library from './services/library';

const SONGS_WILL_FETCH = 'SONGS_WILL_FETCH';
const SONGS_DID_FETCH = 'SONGS_DID_FETCH';
const SONGS_FETCH_ERROR = 'SONGS_FETCH_ERROR';
const SORT_SONGS = 'SORT_SONGS';
const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';

const ALBUMS_WILL_FETCH = 'ALBUMS_WILL_FETCH';
const ALBUMS_DID_FETCH = 'ALBUMS_DID_FETCH';
const ALBUMS_FETCH_ERROR = 'ALBUMS_FETCH_ERROR';

const PLAYLIST_WILL_FETCH = 'PLAYLIST_WILL_FETCH';
const PLAYLIST_DID_FETCH = 'PLAYLIST_DID_FETCH';
const PLAYLIST_FETCH_ERROR = 'PLAYLIST_FETCH_ERROR';
const PLAYLIST_CHANGE_CURRENT_SONG = 'PLAYLIST_CHANGE_CURRENT_SONG';
const PLAYLIST_PLAY_NEXT_SONG = 'PLAYLIST_PLAY_NEXT_SONG';

const PLAYER_STATUS_UPDATE = 'PLAYER_STATUS_UPDATE';
const REPLACE_PLAYLIST = 'REPLACE_PLAYLIST';

/**
 * Get or Search songs.
 * @param query
 * @param sort
 */
const getSongs = (query, sort) => dispatch => {
  dispatch({
    type: SONGS_WILL_FETCH,
    payload: null
  });

  library.getSongs(query, sort)
    .then(songs => dispatch({
      type: SONGS_DID_FETCH,
      payload: songs
    }))
    .catch(error => dispatch({
      type: SONGS_FETCH_ERROR,
      payload: error
    }));
}

/**
 * Sort songs list.
 * @param sort
 * @returns {{type: string, payload: *}}
 */
const updateSort = sort => ({
  type: SORT_SONGS,
  payload: sort
});


/**
 * Update search query.
 * @param query
 */
const updateQuery = query => ({
  type: UPDATE_SEARCH_QUERY,
  payload: query
});

const getAlbums = () => dispatch => {
  dispatch({
    type: ALBUMS_WILL_FETCH,
    payload: null
  });

  library.getAlbums()
    .then(songs => dispatch({
      type: ALBUMS_DID_FETCH,
      payload: songs
    }))
    .catch(error => dispatch({
      type: SONGS_FETCH_ERROR,
      payload: error
    }));
};

/**
 * To load playlist on page load.
 */
const getPlaylist = () => dispatch => {
  dispatch({
    type: PLAYLIST_WILL_FETCH,
    payload: null
  });

  library.getPlaylist()
    .then(list => dispatch({
      type: PLAYLIST_DID_FETCH,
      payload: list
    }))
    .catch(error => dispatch({
      type: PLAYLIST_FETCH_ERROR,
      payload: error
    }));
};

/**
 * Change currently playing song
 * @param item
 */
const changeCurrentSong = item => dispatch => {
  dispatch ({
    type: PLAYLIST_CHANGE_CURRENT_SONG,
    payload: item
  });
};

const playNextSong = () => dispatch => {
  dispatch({
    type: PLAYLIST_PLAY_NEXT_SONG,
    payload: null
  });
}
/**
 * Add single song to playlist.
 * @param song
 */
const addToPlaylist = song => dispatch => {
  dispatch({
    type: ADD_TO_PLAYLIST,
    payload: song
  });
};

/**
 * Replace playlist with many songs.
 * Used by album clicks.
 * @param songs
 */
const replacePlaylist = songs => dispatch => {
  dispatch({
    type: REPLACE_PLAYLIST,
    payload: songs
  });
};

/**
 * Responsible for player's behaviour.
 * @param status
 */
const updatePlayerStatus = status => dispatch => {
  dispatch({
    type: PLAYER_STATUS_UPDATE,
    payload: status
  })
}

export default {
  getSongs,
  updateSort,
  updateQuery,
  getAlbums,
  getPlaylist,
  changeCurrentSong,
  playNextSong,
  addToPlaylist,
  replacePlaylist,
  updatePlayerStatus
};

export {
  SONGS_WILL_FETCH,
  SONGS_DID_FETCH,
  SONGS_FETCH_ERROR,
  SORT_SONGS,
  ADD_TO_PLAYLIST,
  UPDATE_SEARCH_QUERY,
  ALBUMS_WILL_FETCH,
  ALBUMS_DID_FETCH,
  ALBUMS_FETCH_ERROR,
  PLAYLIST_WILL_FETCH,
  PLAYLIST_DID_FETCH,
  PLAYLIST_FETCH_ERROR,
  PLAYLIST_CHANGE_CURRENT_SONG,
  PLAYLIST_PLAY_NEXT_SONG,
  PLAYER_STATUS_UPDATE,
  REPLACE_PLAYLIST
};
