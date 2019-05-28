import db from '../collections/db';

function getSongs(query, sort) {
  return db.getSongs(query, sort);
}

function getAlbums(query) {
  return db.getAlbums(query);
}

export default {
  getSongs,
  getAlbums
};
