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
  state = {
    sort: {
      property: 'title',
      direction: 'asc'
    }
  };

  componentDidMount() {
    this.loadSongs();
  }

  loadSongs() {
    const {sort} = this.state;
    this.props.getSongs(null, sort);
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

function mapStateToProps({library: {songs, loading, error}}) {
  return {
    songs, loading, error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSongs: (query, sort) => dispatch(actions.getSongs(query, sort))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
