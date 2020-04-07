import React from 'react';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const ArticleContentLayout = {
  backgroundColor: 'rgb(241.0, 241.0, 241.0)',
  borderRadius: '15px',
  padding: '2em 4em',
  whiteSpace: 'pre-line'
}

const ArticleFooter = {
  paddingTop: '1em'
}

function ArticleBody(props) {
  const { comments, selftext } = props.article;
  const commentsLength = comments ? comments.length : 0;
  return (
    <Layout style={ArticleContentLayout}>
      <Content >
        {selftext}
      </Content>
      <Footer style={ArticleFooter}>
        <FontAwesomeIcon icon={faCommentAlt} style={{ padding: '0 .75em 0 0', width: '2em' }} />
        {comments ? commentsLength : 0} Comments
    </Footer>
    </Layout>
  );
}

export default ArticleBody;