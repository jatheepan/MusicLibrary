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

function addToPlaylist(song) {
  return db.addToPlaylist(song);
}

function replacePlaylist(songs) {
  return db.replacePlaylist(songs);
}

export default {
  getSongs,
  getAlbums,
  getPlaylist,
  addToPlaylist,
  replacePlaylist
};
