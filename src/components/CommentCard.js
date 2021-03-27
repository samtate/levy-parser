import React from 'react';

const CommentCard = ({ comment, fieldSearch }) => {
  return (
    <>
      <h1>{fieldSearch("lookingAtThePointsOnTheMapShownAboveWhichPointAreYouCommentingOnPleaseAddSeparateCommentsForDifferentPoints").value}</h1>
      <h2>{fieldSearch("whyFeel").value}</h2>
      <h2>{comment.feeling}/100</h2>
      <p>{fieldSearch("anythingElse").value}</p>
      <p>👍 {comment.agree.number}</p>
    </>
  )
};

export default CommentCard;
