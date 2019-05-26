import React, { Component } from 'react';
import { getSongs } from '../../services/library';
import './style.scss';


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
      <div key={song.id} className="row">
        <div className="column title">{song.title}</div>
        <div className="column album">{song.album.title}</div>
        <div className="column artist">{song.album.artist}</div>
        <div className="column duration">{song.duration.toFixed(2)}</div>
      </div>
    ));

    return (
      <div className="Library">
        <h1>Library</h1>
        <div className="table-header">
          <div className="column title">Title</div>
          <div className="column album">Album</div>
          <div className="column artist">Artist</div>
          <div className="column duration">Duration</div>
        </div>
        {listItems}
      </div>
    );
  }
}
