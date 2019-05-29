import React from 'react';
import { connect } from 'react-redux';
import SongsList from './components/songsList';
import AlbumList from './components/albumList';
import AppHeader from './components/AppHeader';
import Player from './components/player';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faSearch, faCompactDisc, faMusic } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc, faMusic]);

function App(props) {
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
        <div className="content">
          <SongsList />
          <div className="album-widget">
            <AlbumList />
          </div>
        </div>
        <Player />
      </div>
    </div>
  );
}

function mapStateToProps({global: {}}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
