import Styled from 'styled-components';

export const Breadcrumb = Styled.div`
  color: rgb(109.0, 109.0, 109.0);
  letter-spacing: 1px;
`;

export const Ups = Styled.span`
  display: inline-block;
  margin-right: 2em;
`;

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

export const Title = Styled.h1`
  display: inline-block;
  font-size: 2em;
  font-weight: 500;
  margin: 20px 0;
  color: rgb(44.0, 44.0, 44.0);
`;

export const ArticleContent = {
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '2em',
  color: 'rgb(98, 98, 98)'
}

export const ArticleContentLayout = {
  backgroundColor: 'rgb(241.0, 241.0, 241.0)',
  borderRadius: '15px',
  padding: '2em 4em',
  whiteSpace: 'pre-line'
}

export const ArticleFooter = {
  paddingTop: '1em'
}

export const CommentContent = {
  padding: '1em',
  listStyleType: 'none'
}

export const ChildCommentContent = {
  padding: '1em',
  paddingLeft: '4em',
  borderLeft: '2px solid rgb(239, 239, 239)',
  listStyleType: 'none'
}

export const InfoPoints = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;

export const InfoTime = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;