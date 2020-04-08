import React, { Component, Fragment } from 'react';
import { Button, Comment, Layout, PageHeader, Result, Skeleton } from 'antd';
import ArticleBody from './ArticleBody';
import CommentInfo from '../Comment/CommentInfo';
import CommentAuthor from '../Comment/CommentAuthor';
import 'antd/lib/button/style/css';

import {
  Breadcrumb,
  Ups,
  Title,
  ArticleContent,
  CommentContent,
  CommentText,
  ChildCommentContent,
} from './style';

const { Content, Header } = Layout;

class Article extends Component {
  state = {
    commentRoot: []
  }

  updateDeletedComment(comment) {
    comment.body = 'This comment has been deleted.';
    comment.author = 'N/A';
    comment.created_utc = false;
    comment.ups = 0;
    return comment;
  }

  deleteComment = (comment) => {
    const { id, parent_id } = comment;
    const { commentRoot } = this.state;
    let rootIndex = commentRoot.findIndex(comment => comment.id === id);
    // Handle deleting comments on the root level.
    if (!parent_id) {
      commentRoot[rootIndex] = this.updateDeletedComment(comment);
    }
    // Get the index of the comment and update the body content.
    let nestedIndex;
    let secondNestedParentIndex;
    let lastNestedParentIndex;
    // Loop through all of the comments and delete the one matching the id that was clicked.
    if (parent_id && rootIndex === -1 && commentRoot) {
      commentRoot.forEach(comment => {
        nestedIndex = comment.children ? comment.children.findIndex(comment => comment.id === id) : false;
        if (typeof nestedIndex === "number" && nestedIndex !== -1) {
          comment.children[nestedIndex] = this.updateDeletedComment(comment.children[nestedIndex]);
        }
        if (nestedIndex === -1 && comment.children) {
          comment.children.forEach(comment => {
            secondNestedParentIndex = comment.children ? comment.children.findIndex(comment => comment.id === id) : -1;
            if (typeof secondNestedParentIndex === "number" && secondNestedParentIndex !== -1) {
              comment.children[secondNestedParentIndex] = this.updateDeletedComment(comment.children[secondNestedParentIndex]);
            }
            if (secondNestedParentIndex === -1 && comment.children) {
              comment.children.forEach(comment => {
                lastNestedParentIndex = comment.children ? comment.children.findIndex(comment => comment.id === id) : -1;
                if (typeof lastNestedParentIndex === "number" && lastNestedParentIndex !== -1) {
                  comment.children[lastNestedParentIndex] = this.updateDeletedComment(comment.children[lastNestedParentIndex]);
                }
              });
            }
          });
        }
      });
    }
    this.setState({ commentRoot });
  }

  componentDidMount() {
    if (this.props.article) {
      const { comments } = this.props.article;
      const builtCommentRoot = [];
      if (comments && comments.length) {
        comments.forEach(comment => {
          const { parent_id } = comment;
          // Get the children and dedupe.
          let children = comments.filter(comment => comment.parent_id === parent_id);
          // Sort children by date.
          children = children.sort((a, b) => b.created_utc - a.created_utc);
          let parentIndex = builtCommentRoot.findIndex(comment => comment.id === parent_id);
          // If the comment doesn't have the 'parent_id' field add it the top level of commentMap.
          if (!parent_id) return builtCommentRoot.push(comment);
          if (builtCommentRoot[parentIndex] && children) {
            // Add the children to the root comments.
            if (!builtCommentRoot[parentIndex].children) {
              builtCommentRoot[parentIndex].children = children;
            } else if (builtCommentRoot[parentIndex].children) {
              builtCommentRoot[parentIndex].children.push(children);
            }
            // Loop through the children and get their children.
            children.forEach(child => {
              const { id } = child;
              // Get the children of this child and dedupe.
              let nestedChildren = comments.filter(comment => comment.parent_id === id);
              // Sort children by date.
              nestedChildren = nestedChildren.sort((a, b) => b.created_utc - a.created_utc);
              // Get the index of this child.
              let nestedParentIndex = builtCommentRoot[parentIndex].children.findIndex(child => child.id === id);
              if (builtCommentRoot[parentIndex].children[nestedParentIndex] && nestedChildren) {
                // Add the nestedChildren to the child.
                if (!builtCommentRoot[parentIndex].children[nestedParentIndex].children) {
                  builtCommentRoot[parentIndex].children[nestedParentIndex].children = nestedChildren;
                } else if (builtCommentRoot[parentIndex].children[nestedParentIndex].children) {
                  builtCommentRoot[parentIndex].children[nestedParentIndex].children.push(nestedChildren);
                }
                // Loop through the children and get their children.
                nestedChildren.forEach(comment => {
                  const { id } = comment;
                  //console.log(comment);
                  // Get the children of this child and dedupe.
                  let lastNestedChildren = comments.filter(comment => comment.parent_id === id);
                  // Sort children by date.
                  lastNestedChildren = lastNestedChildren.sort((a, b) => b.created_utc - a.created_utc);
                  // Get the index of this child.
                  let lastNestedParentIndex = builtCommentRoot[parentIndex].children[nestedParentIndex].children.findIndex(child => child.id === id);
                  if (builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex] && lastNestedChildren) {
                    // Add the lastNestedChildren to the child.
                    if (!builtCommentRoot[parentIndex].children[nestedParentIndex].children[lastNestedParentIndex].children) {
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
        this.setState({ commentRoot: builtCommentRoot });
      }
    }
  }

  render() {
    // Return early if there wasn't an article passed through.
    if (!this.props.article) {
      return (
        <Fragment>
          <Layout>
            <Header>
              <PageHeader>
                <Result
                  status="404"
                  title="Post not Found!"
                  subTitle="Sorry, the reddit post you visited does not exist."
                  extra={<Button href="https://www.reddit.com/" type="primary" style={{ margin: '2em' }}>Back Home</Button>}
                  style={{
                    textAlign: 'center'
                  }}
                />
              </PageHeader>
            </Header>
          </Layout>
        </Fragment>
      );
    }

    const { subreddit, title, ups } = this.props.article;
    const { commentRoot } = this.state;

    return (
      <Fragment>
        <Layout>
          <Header>
            <PageHeader>
              <Breadcrumb><a href="https://www.reddit.com/r/unpopularopinion/" style={{ color: 'rgb(109.0, 109.0, 109.0)' }}>r/{subreddit}</a></Breadcrumb>
              <Fragment>
                <Ups>{ups / 1000}k</Ups>
                <Title>{title}</Title>
              </Fragment>
            </PageHeader>
          </Header>
          <Content style={ArticleContent}>
            <ArticleBody article={this.props.article} />
            <Layout style={{ paddingTop: '2em', display: 'inline-block' }}>
              <Content>
                {commentRoot && commentRoot.length ? commentRoot.map(comment => {
                  const { author, body, children, id } = comment;
                  const nestedComments = (children || []).map(comment => {
                    const { author, body, children, id } = comment;
                    const nestedChildrenComments = (children || []).map(comment => {
                      const { author, body, children, id } = comment;
                      const lastNestedChildrenComments = (children || []).map(comment => {
                        const { author, body, id } = comment;
                        if (!id) return false;
                        return (
                          <Comment
                            key={id}
                            author={<CommentAuthor author={author} />}
                            datetime={<CommentInfo comment={comment} deleteComment={this.deleteComment} />}
                            content={<CommentText>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</CommentText>}
                            style={ChildCommentContent}
                          />
                        );
                      });
                      if (!id) return false;
                      return (
                        <Comment
                          key={id}
                          author={<CommentAuthor author={author} />}
                          datetime={<CommentInfo comment={comment} deleteComment={this.deleteComment} />}
                          content={<CommentText>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</CommentText>}
                          style={ChildCommentContent}
                        >
                          {lastNestedChildrenComments}
                        </Comment>
                      );
                    });
                    if (!id) return false;
                    return (
                      <Fragment key={id}>
                        <Comment
                          key={id}
                          author={<CommentAuthor author={author} />}
                          datetime={<CommentInfo comment={comment} deleteComment={this.deleteComment} />}
                          content={<CommentText>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</CommentText>}
                          style={ChildCommentContent}
                        >
                          {nestedChildrenComments}
                        </Comment>
                      </Fragment>
                    );
                  });
                  if (!id) return false;
                  return (
                    <Fragment key={id}>
                      <Comment
                        key={id}
                        author={<CommentAuthor author={author} />}
                        datetime={<CommentInfo comment={comment} deleteComment={this.deleteComment} />}
                        content={<CommentText>{body !== '[deleted]' ? body : 'This comment has been deleted.'}</CommentText>}
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