import db from '../collections/db';

function getSongs(query, sort) {
  return db.getSongs(sort);
}

function getAlbums() {
  return db.getAlbums();
}

export default {
  getSongs,
  getAlbums
};
