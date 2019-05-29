/**
 *
 * This is a mock database.
 *
 */

import albumsCollection from './albums.json';
import songsCollection from './songs.json';
import playlistCollection from './playlist.json';

/**
 * Just to simulate the delay of real api calls.
 * @param payload
*/
function delayedResolve(payload) {
  return new Promise(resolve => {
    setTimeout(() => resolve(payload), 100);
  });
}

function getAlbums() {
  const songs = songsCollection;
  const albums = albumsCollection.map(album => {
    album.songs = songs.filter(({album_id}) => album_id === album.id);
    return album;
  });
  return delayedResolve(albums);
}

function getSongs(query = '', sort = {property: 'title', direction: 'asc'}) {
  let songs = songsCollection.map(song => {
    const album = albumsCollection.find(a => a.id === song.album_id);
    if(album) {
      song.album = album;
    }
    return song;
  });

  songs = sortList(filterList(songs, query), sort);
  return delayedResolve(songs);
}

async function getPlaylist() {
  const songs = await getSongs();
  return playlistCollection.map(p => {
    const song = songs.find(s => s.id === p.song_id);
    if(song) {
      p.song = song;
    }
    return p;
  });
}

function filterList(list, query) {
  query = (query || '').trim();
  if(query.length < 1) return list;
  return list.filter(item => {
    const pattern = new RegExp(query, 'gi');
    if(item.title && pattern.test(item.title)) {
      return true;
    } else if(item.album && item.album.title && pattern.test(item.album.title)) {
      return true;
    } else if(item.album && item.album.artist && pattern.test(item.album.artist)) {
      return true;
    } else {
      return false;
    }
  });
}

function sortList(list, sort) {
  const newList = [].concat(list);
  return newList.sort((a, b) => {
    let value1, value2 = null;
    if(sort.property === 'title') {
      value1 = a.title;
      value2 = b.title;
    } else if(sort.property === 'album') {
      value1 = a.album.title;
      value2 = b.album.title;
    } else if(sort.property === 'artist') {
      value1 = a.album.artist;
      value2 = b.album.artist;
    } else if(sort.property === 'duration') {
      value1 = a.duration;
      value2 = b.duration;
    }
    value1 = (typeof value1 === "string") ? value1.toLowerCase() : value1;
    value2 = (typeof value2 === "string") ? value2.toLowerCase() : value2;

    if(value1 === value2) return 0;
    let result = value1 > value2;
    result = sort.direction === 'desc' ? !result : result;
    return result ? 1 : -1;
  });
}

export default {
  getAlbums,
  getSongs,
  getPlaylist
};
