import albumsCollection from './albums.json';
import songsCollection from './songs.json';

function getAlbums() {
  return Promise.resolve(albumsCollection);
}

function getSongs() {
  const songs = songsCollection.map(song => {
    const album = albumsCollection.find(a => a.id === song.album_id);
    if(album) {
      song.album = album;
    }
    return song;
  });
  return Promise.resolve(songs);
}

export default {
  getAlbums,
  getSongs
};
