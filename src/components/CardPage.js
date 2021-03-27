import React from 'react';
import CommentCard from './CommentCard';

const CardPage = ({ commonplaceData, selectedFilter, searchTerm }) => {
  const compare = ( a, b ) => {
    if ( a.agree.number < b.agree.number ){
      return -1;
    }
    if ( a.agree.number > b.agree.number ){
      return 1;
    }
    return 0;
  }
  console.log(typeof commonplaceData)
  console.log(commonplaceData)
  const sortedData = ''
  const generateCard = (comment, [min, max]) => {
    const fieldSearch = name => {
      const result = comment.fields.filter((entry) => entry.name === name );
      return (result.length === 0 || result === undefined) ? {value:''} : result[0];
    }

    let render = true;
    if (selectedFilter !== 'all' && fieldSearch("lookingAtThePointsOnTheMapShownAboveWhichPointAreYouCommentingOnPleaseAddSeparateCommentsForDifferentPoints").value !== selectedFilter) {
      render = false;
    }
    if (!fieldSearch("anythingElse").value.includes(searchTerm)) {
      render = false;
    }
    if (comment.feeling > max || comment.feeling < min) {
      render = false;
    }

    return render ? <CommentCard comment={comment} fieldSearch={fieldSearch} /> : '';
  }
  const mapData = (min,max) => commonplaceData !== '' ? commonplaceData.map(comment => generateCard(comment, [min,max])).filter(el => el != '') : ''
  const negativeComments = mapData(0,40);
  const neutralComments = mapData(41,59);
  const positiveComments = mapData(60,100);
  console.log(neutralComments)
  return (
    <>
      <div className="card-page-flex">
        <div className="card-page-column">
          {negativeComments.length ? <><div className="card-page-column-header">Negative</div><p>{negativeComments.length} responses</p></> : ''}
          {negativeComments}
        </div>
        <div className="card-page-column">
          {neutralComments.length ? <><div className="card-page-column-header">Neutral</div><p>{neutralComments.length} responses</p></> : ''}
          {neutralComments}
        </div>
        <div className="card-page-column">
          {positiveComments.length ? <><div className="card-page-column-header">Positive</div><p>{positiveComments.length} responses</p></> : ''}
          {positiveComments}
        </div>
      </div>
    </>
  )
};

export default CardPage;
