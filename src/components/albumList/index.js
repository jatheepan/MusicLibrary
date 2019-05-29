import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import './style.scss';

class AlbumList extends Component {
  componentDidMount() {
    const {query} = this.props;
    this.props.getAlbums(query);
  }

  render() {
    const {albums, error, loading} = this.props;
    const listItems = albums.map(album => (
      <div className="album" key={album.id}>
        <div className="thumbnail"><img src={album.thumbnail} alt={album.title} /></div>
        <div className="title">{album.title}</div>
      </div>
    ));
    const errorMessage = !error ? null : (<div className="error message">{error}</div>);
    return (
      <div className="AlbumList">
        {errorMessage}
        <h1>Albums</h1>
        <div className="albums-body">
          {!albums.length && !loading ? <div className="no-data">No albums for found</div> : null}
          {listItems}
        </div>
      </div>
    );
  }
}

function mapStateToProps({albumList: {albums, error}, global: {loading}}) {
  return {
    albums, loading, error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbums: () => dispatch(actions.getAlbums())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
