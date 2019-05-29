import library from './services/library';

const SONGS_WILL_FETCH = 'Songs will fetch';
const SONGS_DID_FETCH = 'Songs did fetch';
const SONGS_FETCH_ERROR = 'Songs fetch error';
const SORT_SONGS = 'Sort songs';
const UPDATE_SEARCH_QUERY = 'Update search query';

const ALBUMS_WILL_FETCH = 'Albums will fetch';
const ALBUMS_DID_FETCH = 'Albums did fetch';
const ALBUMS_FETCH_ERROR = 'Albums fetch error';

const PAGE_CHANGE = 'Page navigation';

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

function updateSort(sort) {
  return {
    type: SORT_SONGS,
    payload: sort
  };
};

function updateQuery(query) {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: query
  };
}

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
}

const pageChange = activePage => ({
  type: PAGE_CHANGE,
  payload: activePage
});

export default {
  getSongs,
  updateSort,
  updateQuery,
  getAlbums,
  pageChange
};

export {
  SONGS_WILL_FETCH,
  SONGS_DID_FETCH,
  SONGS_FETCH_ERROR,
  SORT_SONGS,
  UPDATE_SEARCH_QUERY,
  ALBUMS_WILL_FETCH,
  ALBUMS_DID_FETCH,
  ALBUMS_FETCH_ERROR,
  PAGE_CHANGE
};
