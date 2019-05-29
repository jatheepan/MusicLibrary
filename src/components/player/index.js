import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class Player extends Component {
  render() {
    const {currentSong} = this.props;
    return (
      <div className="Player">
        <AlbumThumbnail album={currentSong && currentSong.album} />
        <div className="title">{currentSong && currentSong.album.title}</div>
      </div>
    );
  }
}

function mapStateToProps({playList}) {
  return {
    currentSong: playList.currentSong
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChange: (page) => dispatch(actions.pageChange(page))
  };
}

function AlbumThumbnail({album}) {
  let image = <FontAwesomeIcon icon="music" className="icon" />;

  if(album && album.thumbnail) {
    const style = {
      color: 'red',
      backgroundImage: `url(${album.thumbnail})`
    };
    console.log(style)
    image = <div style={style} />
  }
  return (
    <div className="thumbnail">
      {image}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

