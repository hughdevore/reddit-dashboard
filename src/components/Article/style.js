import Styled from 'styled-components';

export const Breadcrumb = Styled.div`
  color: rgb(109.0, 109.0, 109.0);
  letter-spacing: 1px;
`;

export const Ups = Styled.span`
  display: inline-block;
  margin-right: 2em;
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

export const CommentContent = {
  padding: '1em',
  listStyleType: 'none'
}

export const CommentText = Styled.span`
  padding: .5em 0 1em 0;
  display: inline-block;
`;

export const ChildCommentContent = {
  padding: '1em',
  paddingLeft: '4em',
  borderLeft: '2px solid rgb(239, 239, 239)',
  listStyleType: 'none'
}