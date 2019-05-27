import React from 'react';
import Library from './components/library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faSearch, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add([faCaretUp, faCaretDown, faSearch, faCompactDisc]);

function App() {
  return (
    <div className="App">
      <Library />
    </div>
  );
}

export default App;
