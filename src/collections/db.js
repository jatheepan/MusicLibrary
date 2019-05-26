import albums from './albums.json';
import songs from './songs.json';

function getAlbums() {
  return Promise.resolve(albums);
}

function getSongs() {
  return Promise.resolve(songs);
}

export default {
  getAlbums,
  getSongs
};
