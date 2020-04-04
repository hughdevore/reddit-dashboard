import React, { Fragment } from 'react';
import { Layout, PageHeader } from 'antd';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

const { Content, Footer, Header } = Layout;

const Breadcrumb = Styled.div`
  color: rgb(109.0, 109.0, 109.0);
  letter-spacing: 1px;
`;

const Ups = Styled.span`
  display: inline-block;
  margin-right: 2em;
`;

const Title = Styled.h1`
  display: inline-block;
  font-size: 2em;
  font-weight: 500;
  margin: 20px 0;
`;

const ArticleContent = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '2em'
}

const ArticleContentLayout = {
  backgroundColor: 'rgb(241.0, 241.0, 241.0)',
  borderRadius: '10px',
  padding: '2em 4em',
  whiteSpace: 'pre-line'
}

const ArticleFooter = {
  paddingTop: '1em'
}

function Article(props) {
    const { comments, selftext, subreddit, title, ups } = props.article;

    return (
      <Fragment>
        <Layout>
          <Header>
            <PageHeader>
              <Breadcrumb>r/{subreddit}</Breadcrumb>
              <Fragment>
                <Ups>{ups/1000}k</Ups>
                <Title>{title}</Title>
              </Fragment>
            </PageHeader>
          </Header>
          <Content style={ArticleContent}>
            <Layout style={ArticleContentLayout}>
              <Content >
                {selftext}
              </Content>
              <Footer style={ArticleFooter}>
                <FontAwesomeIcon icon={faCommentAlt} />
              </Footer>
            </Layout>
          </Content>
        </Layout>
      </Fragment>
      
    );
}


export default Article;