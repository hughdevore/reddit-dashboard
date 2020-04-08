import React, { Component, Fragment } from 'react';
import { Layout, Skeleton } from 'antd';
import 'antd/lib/skeleton/style/css';
import Article from './components/Article/Article';
import fetchArticle from './utils/fetchArticle';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // Fetch the data for the article and comments.
    fetchArticle()
      .then(article => {
        setTimeout(() => {
          this.setState({ article, isLoading: false })
        }, 750);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { article, isLoading } = this.state;
    return (
      <Fragment>
        <Layout
          style={{
            backgroundColor: 'rgb(222, 228, 234)',
            padding: '7em 10em',
            minHeight: '100vh'
          }}
        >
          <Layout
            style={{
              backgroundColor: 'rgb(249, 249, 249)',
              padding: '3em 6em',
              borderRadius: '15px',
              boxShadow: '0 0 10px gray',
              fontFamily: 'verdana'
            }}
          >
            <Skeleton active={true} loading={isLoading}>
              <Article article={article} />
            </Skeleton>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
