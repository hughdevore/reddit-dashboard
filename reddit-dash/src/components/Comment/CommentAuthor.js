import React from 'react';

function CommentAuthor(props) {
  return (
    <a style={{ textDecoration: 'none' }} href={'https://www.reddit.com/user/' + props.author !== '[deleted]' ? props.author : 'N/A'}>{props.author}</a>
  );
}

export default CommentAuthor;