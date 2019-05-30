import React from 'react';
import SongsList from './components/songsList';
import AlbumList from './components/albumList';
import AppHeader from './components/AppHeader';
import Player from './components/player';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretUp,
  faCaretDown,
  faSearch,
  faCompactDisc,
  faMusic,
  faPlus,
  faPlay,
  faPause } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc, faMusic, faPlus, faPlay, faPause]);

export default function App() {
  return (
    <div className="App">
      <AppHeader />
      <Player />
      <div className="main">
        <div className="content">
          <SongsList />
          <div className="album-widget">
            <AlbumList />
          </div>
        </div>
      </div>
    </div>
  );
}
