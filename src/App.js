import React from 'react';
import SongsList from './components/songsList';
import AppHeader from './components/AppHeader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faSearch, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc]);

function App() {
  return (
    <div className="App">
      <AppHeader />
      <SongsList />
    </div>
  );
}

export default App;
