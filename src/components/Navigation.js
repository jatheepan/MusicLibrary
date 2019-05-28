import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import './Navigation.scss';

function Navigation(props) {
  const className = item => item === props.activePage ? 'active' : '';
  return(
    <div className="Navigation">
      <div className={className('songs') + ' item'} onClick={() => props.pageChange('songs')}>Songs</div>
      <div className={className('albums') + ' item'} onClick={() => props.pageChange('albums')}>Albums</div>
    </div>
  );
}

function mapStateToProps({global: {activePage}}) {
  return {
    activePage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChange: (page) => dispatch(actions.pageChange(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
