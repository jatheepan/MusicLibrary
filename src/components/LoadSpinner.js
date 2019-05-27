import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadSpinner(props) {
  let classNames = '';
  classNames += props.loading ? ' visible' : ' hidden';
  return (
    <div className={classNames}>
      <FontAwesomeIcon icon="compact-disc" className="spinner" />
    </div>
  );
}
