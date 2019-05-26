import React from 'react';
import Library from './components/library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(faCaretUp);
library.add(faCaretDown);

function App() {
  return (
    <div className="App">
      <Library />
    </div>
  );
}

export default App;
