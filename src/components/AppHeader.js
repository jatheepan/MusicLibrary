import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../actions';
import LoadSpinner from './LoadSpinner';
import Navigation from './Navigation';
import './AppHeader.scss';

function AppHeader(props) {
  const {loading} = props;
  return (
    <div className="AppHeader">
      <h1>Music Library</h1>
      <LoadSpinner loading={loading} />
      <Navigation />
      <div className="search-form">
        <div className="search-field">
          <input
            defaultValue={props.query}
            placeholder="Search Song, Album or Artist"
            onKeyUp={e => {
            const query = e.target.value;
            if(e.keyCode === 13) {
              props.updateQuery(query);
            }
          }} />
          <button><FontAwesomeIcon icon="search" /></button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({global: {loading, query}}) {
  return {
    loading, query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateQuery: (query) => dispatch(actions.updateQuery(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
