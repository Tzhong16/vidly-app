import React from 'react';

const Like = props => {
  let classes = 'fa fa-heart';
  if (!props.like) classes += '-o';
  return (
    <i
      onClick={props.onLiked}
      className={classes}
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
    />
  );
};
//

export default Like;
