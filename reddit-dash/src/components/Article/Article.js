import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Comment, Layout, PageHeader, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  Breadcrumb,
  Ups,
  Delete,
  Deleted,
  Title,
  ArticleContent,
  ArticleContentLayout,
  ArticleFooter,
  CommentContent,
  ChildCommentContent,
  InfoPoints,
  InfoTime
} from './style';

const { Content, Footer, Header } = Layout;

class Article extends Component {
  state = {
    commentRoot: []
  }

  deleteComment(comment) {
    const { parent_id } = comment;
    const { commentRoot } = this.state;
    // Get the index of the comment and update the body content.
    let parentIndex = commentRoot.findIndex(comment => comment.id === parent_id);
    let nestedParentIndex;
    let thirdNestedParentIndex;
    let lastNestedParentIndex;
    if (parentIndex) {
      comment.body = 'This comment has been deleted.';
      comment.author = 'N/A';
      comment.created_utc = false;
      comment.ups = 0;
      commentRoot[parentIndex] = comment;
    } 

    // @TODO: Refactor to delete comments individually.
    
    if (typeof parentIndex !== "number") {
      commentRoot[parentIndex].children.forEach(comment => {
        nestedParentIndex = comment.children.findIndex(comment => comment.id === parent_id);
        comment.body = 'This comment has been deleted.';
        comment.author = 'N/A';
        comment.created_utc = false;
        comment.ups = 0;
        comment.children[nestedParentIndex] = comment;
      });
    }

    if (typeof nestedParentIndex === "number") {
      commentRoot[parentIndex].children[nestedParentIndex].forEach(comment => {
        thirdNestedParentIndex = comment.children.findIndex(comment => comment.id === parent_id);
        comment.body = 'This comment has been deleted.';
        comment.author = 'N/A';
        comment.created_utc = false;
        comment.ups = 0;
        comment.children[thirdNestedParentIndex] = comment;
      });
    } 
      
    if (typeof thirdNestedParentIndex !== "number") {
      commentRoot[parentIndex].children[nestedParentIndex].children[thirdNestedParentIndex].children.forEach(comment => {
        lastNestedParentIndex = comment.children.findIndex(comment => comment.id === parent_id);
        comment.body = 'This comment has been deleted.';
        comment.author = 'N/A';
        comment.created_utc = false;
        comment.ups = 0;
        comment.children[lastNestedParentIndex] = comment;
      });
    }
    this.setState({commentRoot});
  }

  renderCommentInfoContent(comment) {
    const { created_utc, ups = 0 } = comment;

    return (
      <div style={{paddingLeft: '1em', display: 'inline-block', color: 'rgb(36, 36, 36)'}}>
        <InfoPoints>{1 === ups ? ups+' point' : ups+' points'}</InfoPoints>
        <span style={{padding: '0 .5em'}}>-</span>
        <InfoTime>{created_utc ? moment.unix(created_utc).fromNow() : 'Deleted'}</InfoTime>
          {created_utc ? 
            <Delete key={comment.id} onClick={() => this.deleteComment(comment)}>
              <span key={comment.id}><FontAwesomeIcon icon={faTrashAlt} /></span>
            </Delete>
            :
            <Deleted key={comment.id}>
              <span key={comment.id}><FontAwesomeIcon icon={faTrashAlt} /></span>
            </Deleted>
          }
      </div>
    )
  }

  renderCommentAuthor(author) {
    return (
      <a style={{textDecoration: 'none'}} href={'https://www.reddit.com/user/' + author}>{author}</a>
    );
  }

  componentDidMount() {
    const { comments } = this.props.article;
    const builtCommentRoot = [];

    if ( comments && comments.length ) {
      comments.forEach(comment => {        
        const { parent_id } = comment;
        // Get the children and dedupe.
        let children = comments.filter(comment => comment.parent_id === parent_id);
        let parentIndex = builtCommentRoot.findIndex(comment => comment.id === parent_id);
        // If the comment doesn't have the 'parent_id' field add it the top level of commentMap.
        if (!parent_id) return builtCommentRoot.push(comment);
        if (builtCommentRoot[parentIndex] && children) {
          // Add the children to the root comments.
          if(!builtCommentRoot[parentIndex].children) {
            builtCommentRoot[parentIndex].children = children;
          } else if (builtCommentRoot[parentIndex].children) {
            builtCommentRoot[parentIndex].children.push(children);
          }
          // Loop through the children and get their children.
          children.forEach(child  => {
            const { id } = child;
            // Get the children of this child and dedupe.
            let nestedChildren = comments.filter(comment => comment.parent_id === id);
            // Get the index of this child.
            let nestedParentIndex = builtCommentRoot[parentIndex].children.findIndex(child => child.id === id);
            if (builtCommentRoot[parentIndex].children[nestedParentIndex] && nestedChildren) {
              // Add the nestedChildren to the child.
              if(!builtCommentRoot[parentIndex].children[nestedParentIndex].children) {
                builtCommentRoot[parentIndex].children[nestedParentIndex].children = nestedChildren;
              } else if (builtCommentRoot[parentIndex].children[nestedParentIndex].children) {
                builtCommentRoot[parentIndex].children[nestedParentIndex].children.push(nestedChildren);
              }
              // Loop through the children and get their children.
              nestedChildren.forEach(comment  => {
                const { id } = comment;
                //console.log(comment);
                // Get the children of this child and dedupe.
                let lastNestedChildren = comments.filter(comment => comment.parent_id === id);
                // Get the index of this child.
                let lastNestedParentIndex = builtCommentRoot[parentIndex].children[nestedParentIndex].children.findIndex(child => child.id === id);
                if (builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex] && lastNestedChildren) {
                  // Add the lastNestedChildren to the child.
                  console.log(lastNestedChildren);
                  if(!builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex].children) {
                    builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex].children = lastNestedChildren;
                  } else if (builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex].children) {
                    builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex].children.push(lastNestedChildren);
                  }
                }
              });
            }
          });
        }
      });
      this.setState({commentRoot: builtCommentRoot});
    }
  }

  render() {
    const { comments, selftext, subreddit, title, ups } = this.props.article;
    const commentsLength = comments ? comments.length : 0;
    const { commentRoot } = this.state;

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
                <FontAwesomeIcon icon={faCommentAlt} style={{padding: '0 .75em 0 0', width: '2em'}}/>
                {comments ? commentsLength : 0} Comments
              </Footer>
            </Layout>
            <Layout style={{paddingTop: '2em', display: 'inline-block'}}>
              <Content>
                {commentRoot && commentRoot.length ? commentRoot.map(comment => {
                  const { author, body, children, id } = comment;
                  console.log(commentRoot);
                  const nestedComments = (children || []).map(comment => {
                    const { author, body, children, id } = comment;
                    
                    const nestedChildrenComments = (children || []).map(comment => {
                      const { author, body, children, id } = comment;

                      const lastNestedChildrenComments = (children || []).map(comment => {
                        const { author, body, id } = comment;
                        if (!id) return;
                        return (
                          <Comment 
                            key={id}
                            author={this.renderCommentAuthor(author !== '[deleted]' ? author : 'N/A')}
                            datetime={this.renderCommentInfoContent(comment)}
                            content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</span>}
                            style={ChildCommentContent}
                          />
                        );
                      });

                      if (!id) return;
                      return (
                        <Comment 
                          key={id}
                          author={this.renderCommentAuthor(author !== '[deleted]' ? author : 'N/A')}
                          datetime={this.renderCommentInfoContent(comment)}
                          content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</span>}
                          style={ChildCommentContent}
                        >
                          {lastNestedChildrenComments}
                        </Comment>
                      );
                    });

                    if (!id) return;
                    return (
                      <Fragment key={id}>
                        <Comment 
                          key={id}
                          author={this.renderCommentAuthor(author !== '[deleted]' ? author : 'N/A')}
                          datetime={this.renderCommentInfoContent(comment)}
                          content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</span>}
                          style={ChildCommentContent}
                        >
                          {nestedChildrenComments}
                        </Comment>
                      </Fragment>
                    );
                  });
              
                  if (!id) return;
                  return (
                    <Fragment key={id}>
                      <Comment 
                        key={id}
                        author={this.renderCommentAuthor(author !== '[deleted]' ? author : 'N/A')}
                        datetime={this.renderCommentInfoContent(comment)}
                        content={<span style={{padding: '.5em 0 1em 0', display: 'inline-block'}}>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</span>}
                        style={CommentContent}
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