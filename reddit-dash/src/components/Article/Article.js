import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Comment, Layout, PageHeader, Skeleton, Tooltip } from 'antd';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTrash} from '@fortawesome/free-solid-svg-icons'

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
  color: rgb(44.0, 44.0, 44.0);
`;

const ArticleContent = {
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '2em',
  color: 'rgb(98, 98, 98)'
}

const ArticleContentLayout = {
  backgroundColor: 'rgb(241.0, 241.0, 241.0)',
  borderRadius: '15px',
  padding: '2em 4em',
  whiteSpace: 'pre-line'
}

const ArticleFooter = {
  paddingTop: '1em'
}

const CommentContent = {
  padding: '1em',
  listStyleType: 'none'
}

const ChildCommentContent = {
  padding: '1em',
  borderLeft: '2px solid rgb(239, 239, 239)',
  listStyleType: 'none'
}

const InfoPoints = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;

const InfoTime = Styled.span`
  display: inline-block;
  padding: 0 0 .5em 0;
`;

class Article extends Component {

  /**
   * @TODO: Add Doc Blocks to functions and code.
   * @TODO: Add Delete functionality to comments.
   */
  deleteComment(comment) {
    console.log(comment);
    // commentRoot.splice(commentRoot.findIndex(commentRoot, function(item) {
    //   console.log(item);
    //   // return item.value === 'commenet.id';
    // }), 1);
  }

  renderCommentInfoContent(comment) {
    const { created_utc, ups } = comment;
    return (
      <div style={{paddingLeft: '1em', display: 'inline-block', color: 'rgb(36, 36, 36)'}}>
        <InfoPoints>{1 === ups ? ups+' point' : ups+' points'}</InfoPoints>
        <span style={{padding: '0 .5em'}}>-</span>
        <InfoTime>{moment.unix(created_utc).fromNow()}</InfoTime>
      </div>
    )
  }

  renderCommentAuthor(author) {
    return (
      <a style={{textDecoration: 'none'}} href={'https://www.reddit.com/user/' + author}>{author}</a>
    );
  }

  render() {
    const { comments, selftext, subreddit, title, ups } = this.props.article;
    const commentsLength = comments ? comments.length : 0;

    let commentRoot = [];
    let commentMap = {};

    if ( comments && comments.length ) {
      comments.forEach(comment => {        
        const { parent_id } = comment;
        // If the comment doesn't have the 'parent_id' field add it the top level of commentMap.
        if (!parent_id) return commentRoot.push(comment);

        // Add the comment as a child to it's parent using the 'parent_id' field.
        let parentCommentIndex = commentMap[parent_id];
        if(typeof parentCommentIndex !== "number" ) {
          parentCommentIndex = comments.findIndex(comment => comment.id === parent_id);
          commentMap[parent_id] = parentCommentIndex;
        }
        if ( commentRoot[parentCommentIndex] ) {
          if ( !commentRoot[parentCommentIndex].children) {
            return commentRoot[parentCommentIndex].children = [comment]
          }
          commentRoot[parentCommentIndex].children.push(comment)
        }
      });
    }

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
                <FontAwesomeIcon icon={faCommentAlt} style={{padding: '0 .75em 0 0'}}/>
                {comments ? commentsLength : 0} Comments
              </Footer>
            </Layout>
            <Layout style={{paddingTop: '2em', display: 'inline-block'}}>
              <Content>
                {commentRoot && commentRoot.length ? commentRoot.map(comment => {
                  const { author, body, children, id } = comment;
                  const actions = [
                    <span key={comment.id} onClick={this.deleteComment}>
                      <Tooltip title="Delete Comment" />
                      <span key={comment.id}><FontAwesomeIcon icon={faTrash} /></span>
                    </span>
                  ];
                  
                  const nestedComments = (children || []).map(comment => {
                    return (
                      <Comment 
                        key={comment.id}
                        author={this.renderCommentAuthor(author)}
                        datetime={this.renderCommentInfoContent(comment)}
                        content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{comment.body}</span>}
                        style={ChildCommentContent}
                        actions={actions}
                      />
                    );
                  })
              
                  return (
                    <Fragment key={id}>
                      <Comment 
                        key={id}
                        author={this.renderCommentAuthor(author)}
                        datetime={this.renderCommentInfoContent(comment)}
                        content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{body}</span>}
                        style={CommentContent}
                        actions={actions}
                      >
                      {nestedComments}
                      </Comment>
                    </Fragment>
                  );
                }) : 
                  <Skeleton loading={this.props.isLoading} />
                }
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Fragment>
      
    );
  }
}


export default Article;