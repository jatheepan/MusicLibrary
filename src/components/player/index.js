import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class Player extends Component {
  audioRef = React.createRef();
  audio = null;

  componentDidMount() {
    this.props.getPlaylist();
  }

  playSong = (fileUri) => {
    let audioFile = null;
    try {
      audioFile = require(`../../songs/${fileUri}`);
    } catch(e) {
      //TODO: Display error message to user.
      console.error(e);
    }

    if(this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    if(audioFile) {
      this.audio = new Audio(audioFile);
      this.audio.play();
    }
  };

  render() {
    const {currentSong, songs, status} = this.props;
    // this.toggleSong(status);
    return (
      <div className="Player">
        <AlbumThumbnailControl
          album={currentSong && currentSong.song.album}
          status={status}
          onControlClick={(status) => {
            this.props.updatePlayerStatus(status);
            if(status === 'paused' && this.audio) {
              this.audio.pause();
            } else if(status === 'playing' && this.audio) {
              this.audio.play();
            }
          }}
        />
        <div className="controls">
          <div className="player-title">{currentSong && currentSong.song.title}</div>
        </div>
        <Playlist
          currentSong={currentSong}
          status={status}
          songs={songs}
          onClick={item => {
            this.props.changeCurrentSong(item);
            this.props.updatePlayerStatus('playing');
            this.playSong(item.song.file);
          }}
        />
      </div>
    );
  }
}

function Playlist({songs, currentSong, status, onClick}) {
  const items = songs.map((item, index) => {
    let currentSongIndicator = null;
    if(currentSong && item.song.id === currentSong.song.id) {
      let icon = status === 'playing' ? 'play' : 'pause';
      currentSongIndicator = <FontAwesomeIcon icon={icon} className="current-song-indicator" />
    }
    return (
      <div key={index} className="row" onClick={() => onClick(item)}>
        {currentSongIndicator}
        <div className="column title">{item.song.title}</div>
        <div className="column duration">{item.song.duration.toFixed(2)}</div>
      </div>
    );
  });
  return(
    <div className="Playlist">{items}</div>
  );
}

function mapStateToProps({playlist, player}) {
  return {
    currentSong: playlist.currentSong,
    songs: playlist.songs,
    status: player.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChange: (page) => dispatch(actions.pageChange(page)),
    getPlaylist: () => dispatch(actions.getPlaylist()),
    changeCurrentSong: (item) => dispatch(actions.changeCurrentSong(item)),
    updatePlayerStatus: (status) => dispatch(actions.updatePlayerStatus(status))
  };
}

function AlbumThumbnailControl({album, status, onControlClick}) {
  let image = <FontAwesomeIcon icon="music" className="icon" />;

  if(album && album.thumbnail) {
    const style = {
      color: 'red',
      backgroundImage: `url(${album.thumbnail})`
    };
    image = <div style={style} />
  }
  let controlIcon = null;
  if(status === 'playing') {
    controlIcon = <FontAwesomeIcon icon="pause" className="control-icon" onClick={() => onControlClick('paused')} />
  } else if(status === 'paused') {
    controlIcon = <FontAwesomeIcon icon="play" className="control-icon" onClick={() => onControlClick('playing')} />
  }
  return (
    <div className="thumbnail">
      {image}
      {controlIcon}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

