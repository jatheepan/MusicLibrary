import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSongs } from '../../services/library';
import './style.scss';

const SortIcon = ({sort, name}) => {
  if(sort.property !== name) return null;
  let icon = null;
  if(sort.direction === 'asc') {
    icon = 'caret-up';
  } else if(sort.direction === 'desc') {
    icon = 'caret-down';
  } else {
    return null;
  }
  return (
    <FontAwesomeIcon icon={icon} />
  );
};

export default class Library extends Component {
  state = {
    songs: [],
    sort: {
      property: 'title',
      direction: 'asc'
    },
    error: null
  };

  componentDidMount() {
    this.loadSongs();
  }

  loadSongs() {
    const {sort} = this.state;
    getSongs(null, sort)
      .then(songs => this.setState({songs}))
      .catch(error => this.setState({error}));
  }

  sort = (newProperty) => {
    let {sort: {property, direction}} = this.state;
    if(newProperty === property) {
      direction = direction === 'asc' ? 'desc': 'asc';
    }
    property = newProperty;
    this.setState({
      sort: {
        property,
        direction
      }
    }, () => this.loadSongs());
  };

  render() {
    const {songs, error} = this.state;
    const listItems = songs.map(song => (
      <div key={song.id} className="row">
        <div className="column title">{song.title}</div>
        <div className="column album">{song.album.title}</div>
        <div className="column artist">{song.album.artist}</div>
        <div className="column duration">{song.duration.toFixed(2)}</div>
      </div>
    ));
    const errorMessage = !error ? null : (<div className="error message">{error}</div>);
    return (
      <div className="Library">
        <h1>Library</h1>
        {errorMessage}
        <div className="table-header">
          <div className="column title" onClick={() => this.sort('title')}>
            Title <SortIcon sort={this.state.sort} name="title" />
          </div>
          <div className="column album" onClick={() => this.sort('album')}>
            Album <SortIcon sort={this.state.sort} name="album" />
          </div>
          <div className="column artist" onClick={() => this.sort('artist')}>
            Artist <SortIcon sort={this.state.sort} name="artist" />
          </div>
          <div className="column duration" onClick={() => this.sort('duration')}>
            Duration <SortIcon sort={this.state.sort} name="duration" />
          </div>
        </div>
        {listItems}
      </div>
    );
  }
}
