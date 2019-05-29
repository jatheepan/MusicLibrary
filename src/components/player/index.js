import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class Player extends Component {
  componentDidMount() {
    this.props.getPlaylist();
  }

  render() {
    const {currentSong, songs} = this.props;
    return (
      <div className="Player">
        <AlbumThumbnail album={currentSong && currentSong.song.album} />
        <div className="controls">
          <div className="player-title">{currentSong && currentSong.song.title}</div>
        </div>
        <Playlist
          songs={songs}
          onClick={item => this.props.changeCurrentSong(item)}
        />
      </div>
    );
  }
}

function Playlist({songs, onClick}) {
  const items = songs.map((item, index) => {
    return (
      <div key={index} className="row" onClick={() => onClick(item)}>
        <div className="column title">{item.song.title}</div>
        <div className="column duration">{item.song.duration.toFixed(2)}</div>
      </div>
    );
  });
  return(
    <div className="Playlist">{items}</div>
  );
}

function mapStateToProps({playlist}) {
  return {
    currentSong: playlist.currentSong,
    songs: playlist.songs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChange: (page) => dispatch(actions.pageChange(page)),
    getPlaylist: () => dispatch(actions.getPlaylist()),
    changeCurrentSong: (item) => dispatch(actions.changeCurrentSong(item))
  };
}

function AlbumThumbnail({album}) {
  let image = <FontAwesomeIcon icon="music" className="icon" />;

  if(album && album.thumbnail) {
    const style = {
      color: 'red',
      backgroundImage: `url(${album.thumbnail})`
    };
    image = <div style={style} />
  }
  return (
    <div className="thumbnail">
      {image}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

