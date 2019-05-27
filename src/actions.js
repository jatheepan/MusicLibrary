import library from './services/library';

const SONGS_WILL_FETCH = 'Songs will fetch';
const SONGS_DID_FETCH = 'Songs did fetch';
const SONGS_FETCH_ERROR = 'Error fetch error';
const SORT_LIBRARY = 'Sort library';

const getSongs = (query, sort) => dispatch => {
  dispatch({
    type: SORT_LIBRARY,
    payload: sort
  });

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
};

export default {
  getSongs
};

export {
  SONGS_WILL_FETCH,
  SONGS_DID_FETCH,
  SONGS_FETCH_ERROR,
  SORT_LIBRARY
};
