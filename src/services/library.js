import db from '../collections/db';

function getSongs(query, sort) {
  return db.getSongs(query, sort);
}

function getAlbums(query) {
  return db.getAlbums(query);
}

function getPlaylist() {
  return db.getPlaylist();
}

export default {
  getSongs,
  getAlbums,
  getPlaylist
};
