import db from '../collections/db';

function getSongs() {
  return db.getSongs();
}

function getAlbums() {
  return db.getAlbums();
}

export {
  getSongs,
  getAlbums
};
