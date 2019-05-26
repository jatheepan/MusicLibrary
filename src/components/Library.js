import React, { Component } from 'react';
import { getSongs } from '../services/library';

export default class Library extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    getSongs()
      .then(songs => this.setState({songs}));
  }

  render() {
    const {songs} = this.state;
    const listItems = songs.map(song => (
      <div key={song.id}>
        <div className="title">{song.title}</div>
        <div className="album">{song.album.title}</div>
        <div className="artist">{song.album.artist}</div>
      </div>
    ));

    return (
      <div className="Library">
        <h1>Library</h1>
        {listItems}
      </div>
    );
  }
}
