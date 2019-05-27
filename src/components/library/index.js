import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
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

class Library extends Component {
  componentDidMount() {
    const {sort} = this.props;
    this.props.getSongs(null, sort);
  }

  sort = newProperty => {
    let {sort} = this.props;
    if(newProperty === sort.property) {
      sort.direction = sort.direction === 'asc' ? 'desc': 'asc';
    }
    sort.property = newProperty;
    this.props.getSongs(null, sort);
  };

  render() {
    const {songs, error} = this.props;
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
            Title <SortIcon sort={this.props.sort} name="title" />
          </div>
          <div className="column album" onClick={() => this.sort('album')}>
            Album <SortIcon sort={this.props.sort} name="album" />
          </div>
          <div className="column artist" onClick={() => this.sort('artist')}>
            Artist <SortIcon sort={this.props.sort} name="artist" />
          </div>
          <div className="column duration" onClick={() => this.sort('duration')}>
            Duration <SortIcon sort={this.props.sort} name="duration" />
          </div>
        </div>
        {listItems}
      </div>
    );
  }
}

function mapStateToProps({library: {songs, loading, error, sort}}) {
  return {
    songs, loading, error, sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSongs: (query, sort) => dispatch(actions.getSongs(query, sort))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
