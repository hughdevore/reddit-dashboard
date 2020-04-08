import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Styled from 'styled-components';

export const Delete = Styled.span`
  display: inline-block;
  margin-left: 1em;
  font-size: 1em;
  cursor: pointer;
`;

export const Deleted = Styled.span`
  display: inline-block;
  margin-left: 1em;
  font-size: 1em;
`;

export const InfoPoints = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;

export const InfoTime = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;

function CommentInfo(props) {
  const { created_utc, id, ups = 0 } = props.comment;
  const date = moment.unix(created_utc);
  return (
    <div style={{ paddingLeft: '1em', display: 'inline-block', color: 'rgb(36, 36, 36)' }}>
      <InfoPoints>{1 === ups ? ups + ' point' : ups + ' points'}</InfoPoints>
      <span style={{ padding: '0 .5em' }}>-</span>
      <InfoTime>{date ? moment().diff(date, 'days') + ' days and ' + (moment().diff(date, 'hours') % 24) + ' hours ago' : 'Deleted'}</InfoTime>
      {created_utc ?
        <Delete key={id} onClick={() => props.deleteComment(props.comment)}>
          <span key={id}><FontAwesomeIcon icon={faTrashAlt} /></span>
        </Delete>
        :
        <Deleted key={id}>
          <span key={id}><FontAwesomeIcon icon={faTrashAlt} /></span>
        </Deleted>
      }
    </div>
  )
}

export default CommentInfo;