import React, { Component } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import actions from '../../actions';
import './style.scss';

class AlbumList extends Component {
  componentDidMount() {
    const {query} = this.props;
    this.props.getAlbums(query);
  }

  fetchAlbums = memoize(query => this.props.getAlbums(query, this.props.sort));

  render() {
    this.fetchAlbums(this.props.query);
    const {albums, error, loading} = this.props;
    const listItems = albums.map(album => (
      <div className="album">
        <div className="thumbnail"><img src={album.thumbnail} alt={album.title} /></div>
        <div className="title">{album.title}</div>
      </div>
    ));
    const errorMessage = !error ? null : (<div className="error message">{error}</div>);
    return (
      <div className="AlbumList">
        {errorMessage}
        <div className="albums-body">
          {!albums.length && !loading ? (
            this.props.query.length ? (
              <div className="no-data">No albums for search query</div>
            ) : (
              <div className="no-data">No albums for found</div>
            )
          ) : null}
          {listItems}
        </div>
      </div>
    );
  }
}

function mapStateToProps({albumList: {albums, error, sort}, global: {loading, query}}) {
  return {
    albums, loading, error, sort, query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbums: (query) => dispatch(actions.getAlbums(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
