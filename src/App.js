import React from 'react';
import SongsList from './components/songsList';
import AlbumList from './components/albumList';
import AppHeader from './components/AppHeader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faSearch, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc]);

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AlbumList />
    </div>
  );
}

export default App;
