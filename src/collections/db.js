import albumsCollection from './albums.json';
import songsCollection from './songs.json';

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
  return Promise.resolve(albumsCollection);
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

function filterList(list, query) {
  query = (query || '').trim();
  if(query.length < 1) return list;
  return list.filter(item => {
    const pattern = new RegExp(query, 'gi');
    return pattern.test(item.title) || pattern.test(item.album.title) || pattern.test(item.album.artist);
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
  getSongs
};
