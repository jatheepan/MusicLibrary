import React from 'react';
import { connect } from 'react-redux';
import SongsList from './components/songsList';
import AlbumList from './components/albumList';
import AppHeader from './components/AppHeader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faSearch, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc]);

function App(props) {
  const {activePage} = props;
  return (
    <div className="App">
      <AppHeader />
      {activePage === 'songs' ? <SongsList /> : null}
      {activePage === 'albums' ? <AlbumList /> : null}
    </div>
  );
}

function mapStateToProps({global: {activePage}}) {
  return {
    activePage
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
