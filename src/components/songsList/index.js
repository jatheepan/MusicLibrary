import React, { Component } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../actions';
import './style.scss';

class SongsList extends Component {
  componentDidMount() {
    const {sort, query} = this.props;
    this.props.getSongs(query, sort);
  }

  sort = newProperty => {
    let {sort} = this.props;
    if(newProperty === sort.property) {
      sort.direction = sort.direction === 'asc' ? 'desc': 'asc';
    }
    sort.property = newProperty;
    this.props.updateSort(sort);
    this.fetchSongs();
  };

  fetchSongs = memoize(query => this.props.getSongs(query, this.props.sort));

  render() {
    this.fetchSongs(this.props.query);
    const {songs, error, loading} = this.props;
    const listItems = songs.map(song => (
      <div key={song.id} className="table-row">
        <div className="column title">{song.title}</div>
        <div className="column album">{song.album.title}</div>
        <div className="column artist">{song.album.artist}</div>
        <div className="column duration">{song.duration.toFixed(2)}</div>
      </div>
    ));
    const errorMessage = !error ? null : (<div className="error message">{error}</div>);
    return (
      <div className="SongsList">
        {errorMessage}
        <div className="table">
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
          <div className="table-body">
            {!songs.length && !loading ? (
              this.props.query.length ? (
                <div className="no-data">No songs for search query</div>
              ) : (
                <div className="no-data">No songs for found</div>
              )
            ) : null}
            {listItems}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({songsList: {songs, error, sort}, global: {loading, query}}) {
  return {
    songs, loading, error, sort, query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSongs: (query, sort) => dispatch(actions.getSongs(query, sort)),
    updateSort: (sort) => dispatch(actions.updateSort(sort)),
    updateQuery: (query) => dispatch(actions.updateQuery(query))
  };
}

const SortIcon = ({sort, name}) => {
  if(sort.property !== name) return null;
  const iconName = {
    asc: 'caret-up',
    desc: 'caret-down'
  };
  let icon = iconName[sort.direction] || null;
  return (
    <FontAwesomeIcon icon={icon} className="sort-icon" />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
