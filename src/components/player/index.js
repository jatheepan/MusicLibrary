import React, { Component } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class Player extends Component {
  audio = null;

  componentDidMount() {
    this.props.getPlaylist();
  }

  playSong = () => {
    const fileUri = this.props.currentSong.song.file;
    let audioFile = null;
    if(this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    try {
      audioFile = require(`../../songs/${fileUri}`);
    } catch(e) {
      //TODO: Display error message to user.
      console.error(e);
    }
    if(audioFile) {
      this.audio = new Audio(audioFile);
      this.audio.play();
      this.audio.addEventListener('loadedmetadata', () => {
        // console.log(this.audio.duration);
        // console.log(this.audio.currentTime);
      });
    }
  };

  toggleSong = memoize((status, currentSong) => {
    if(!status || !currentSong) return;
    if(status === 'playing') {
      this.playSong();
    } else if(status === 'resumed') {
      this.audio.play();
    } else if(status === 'paused') {
      this.audio.pause();
    } else if(status === 'stopped' && this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  });

  render() {
    const {currentSong, songs, status} = this.props;
    if(status && currentSong) {
      this.toggleSong(status, currentSong.song.id);
    }
    return (
      <div className="Player">
        <AlbumThumbnailControl
          album={currentSong && currentSong.song.album}
          status={status}
          onControlClick={(status) => this.props.updatePlayerStatus(status)}
        />
        <Timeline song={currentSong && currentSong.song} audio={this.audio} />
        <div className="controls">
          <div className="player-title">{currentSong && currentSong.song.album.title || '--'}</div>
        </div>
        <Playlist
          currentSong={currentSong}
          status={status}
          songs={songs}
          onClick={item => {
            this.props.changeCurrentSong(item);
            this.props.updatePlayerStatus('playing');
          }}
        />
      </div>
    );
  }
}

/**
 * Playlist Component.
 * @param songs
 * @param currentSong
 * @param status
 * @param onClick
 * @returns {XML}
 * @constructor
 */
function Playlist({songs, currentSong, status, onClick}) {
  const items = songs.map((item, index) => {
    let currentSongIndicator = null;
    if(currentSong && item.song.id === currentSong.song.id) {
      let icon = (status === 'playing' || status === 'resumed') ? 'play' : (status === 'paused') ? 'pause' : null;
      currentSongIndicator = icon && <FontAwesomeIcon icon={icon} className="current-song-indicator" />
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

/**
 * Player's thumbnail and play/pause control button.
 * @param album
 * @param status
 * @param onControlClick
 * @returns {XML}
 * @constructor
 */
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
  if(status === 'playing' || status === 'resumed') {
    controlIcon = <FontAwesomeIcon icon="pause" className="control-icon" onClick={() => onControlClick('paused')} />
  } else if(status === 'paused') {
    controlIcon = <FontAwesomeIcon icon="play" className="control-icon" onClick={() => onControlClick('resumed')} />
  }
  return (
    <div className="thumbnail">
      {image}
      {controlIcon}
    </div>
  );
}

class Timeline extends Component {
  state = {
    currentTime: 0,
    loaded: false,
    duration: 0,
    indicatorPosition: 0
  };

  componentDidMount() {
  }

  loadedMetaDataCallbackFn = (e) => {
    const audio = e.target;
    this.setState({
      duration: audio.duration,
      currentTime: audio.currentTime
    });
  };

  playCallbackFn = (e) => {
    const audio = e.target;
    this.setState({
      currentTime: audio.currentTime
    });
    setInterval(this.updateCurrentTimeFn, 1000);
  }

  pauseCallbackFn = (e) => {
    clearInterval(this.updateCurrentTimeFn);
  }

  updateCurrentTimeFn = () => {
    this.setState({
      currentTime: this.props.audio && this.props.audio.currentTime
    });
  }

  timelineData = memoize((song, audio) => {
    if(audio) {
      audio.removeEventListener('loadedmetadata', this.loadedMetaDataCallbackFn);
      audio.addEventListener('loadedmetadata', this.loadedMetaDataCallbackFn);
      audio.removeEventListener('play', this.playCallbackFn);
      audio.addEventListener('play', this.playCallbackFn);
      audio.removeEventListener('pause', this.pauseCallbackFn);
      audio.addEventListener('pause', this.pauseCallbackFn);
    }
  });

  render() {
    this.timelineData(this.props.song, this.props.audio);
    let {indicatorPosition, duration, currentTime} = this.state;

    const barWidth = 200;
    indicatorPosition = (duration / barWidth) * currentTime;

    return (
      <div className="Timeline">
        <div className="bar-background" style={{width: barWidth}}>
          <div className="bar" style={{width: `${indicatorPosition}px`}} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

