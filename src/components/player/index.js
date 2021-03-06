import React, { Component } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class Player extends Component {
  audio = null;
  updateCurrentTimeFn = null;
  state = {
    duration: 0,
    currentTime: 0
  };

  componentDidMount() {
    this.props.getPlaylist();
  }

  playSong = () => {
    const currentSong = this.props.songs.find(({id}) => id === this.props.selectedPlaylistItemId);
    if(!currentSong) return;
    const fileUri = currentSong.song.file;
    const audio = this.audio;
    let audioFile = null;
    if(audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('loadedmetadata', this.loadedMetaDataCallbackFn);
      audio.removeEventListener('play', this.playCallbackFn);
      audio.removeEventListener('pause', this.pauseCallbackFn);
      audio.removeEventListener('ended', this.endedCallbackFn);
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
    }
  };

  toggleSong = memoize((songs, status, selectedPlaylistItemId) => {
    if(!status || !selectedPlaylistItemId) return;
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

  loadedMetaDataCallbackFn = ({target: audio}) => {
    this.setState({duration: audio.duration});
  };

  playCallbackFn = (e) => {
    const audio = e.target;
    this.setState({currentTime: audio.currentTime});
    this.updateCurrentTimeFn = setInterval(() => {
      const audio = this.audio;
      if(!audio) {
        clearInterval(this.updateCurrentTimeFn);
        return;
      }
      this.setState({currentTime: audio.currentTime});
    }, 1000);
  }

  pauseCallbackFn = (e) => {
    clearInterval(this.updateCurrentTimeFn);
  }

  endedCallbackFn = (e) => {
    this.setState({currentTime: 0});
    this.props.updatePlayerStatus('stopped');
    clearInterval(this.updateCurrentTime);
    this.props.playNextSong();
    if(this.props.selectedPlaylistItemId) {
      this.props.updatePlayerStatus('playing');
    }
  }

  updateCurrentTime = memoize((selectedPlaylistItemId, audio) => {
    if(audio) {
      audio.addEventListener('loadedmetadata', this.loadedMetaDataCallbackFn);
      audio.addEventListener('play', this.playCallbackFn);
      audio.addEventListener('pause', this.pauseCallbackFn);
      audio.addEventListener('ended', this.endedCallbackFn);
    }
  });

  render() {
    const {selectedPlaylistItemId, songs, status} = this.props;
    if(status && selectedPlaylistItemId) {
      this.toggleSong(songs, status, selectedPlaylistItemId);
    }
    const currentSong = songs.find(({id}) => id === selectedPlaylistItemId);
    if(currentSong) {
      this.updateCurrentTime(currentSong, this.audio);
    }
    return (
      <div className="Player">
        <AlbumThumbnailControl
          album={currentSong && currentSong.song.album}
          status={status}
          onControlClick={(status) => this.props.updatePlayerStatus(status)}
        />
        <Timeline
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          onSeek={time => {
            if(this.audio) {
              this.audio.currentTime = time;
              this.setState({currentTime: time});
            }
          }} />
        <div className="controls">
          <div className="player-title">{currentSong ? currentSong.song.album.title : '--'}</div>
        </div>
        <Playlist
          selectedPlaylistItemId={selectedPlaylistItemId}
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
function Playlist({songs, selectedPlaylistItemId, status, onClick}) {
  const items = songs.map((item, index) => {
    let currentSongIndicator = null;
    if(item.id === selectedPlaylistItemId) {
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
    selectedPlaylistItemId: playlist.selectedPlaylistItemId,
    songs: playlist.songs,
    status: player.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChange: (page) => dispatch(actions.pageChange(page)),
    getPlaylist: () => dispatch(actions.getPlaylist()),
    changeCurrentSong: (item) => dispatch(actions.changeCurrentSong(item.id)),
    playNextSong: () => dispatch(actions.playNextSong()),
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
  render() {
    let {duration, currentTime} = this.props;
    const barWidth = 200;
    const indicatorPosition = duration ? (barWidth / duration) * currentTime : 0;

    return (
      <div className="Timeline">
        <div
          className="bar-background"
          style={{width: barWidth}}
          onClick={e => {
            const {left: barX} = e.target.getBoundingClientRect();
            this.props.onSeek((duration / barWidth) * (e.clientX - barX));
          }}
        >
          <div className="bar" style={{width: `${indicatorPosition}px`}} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

