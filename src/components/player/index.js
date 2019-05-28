import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import './style.scss';

function Player() {
  return (
    <div className="Player">Player</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);

