import React, { Component, Fragment } from 'react';
import { Layout, Skeleton } from 'antd';
import Article from './components/Article/Article';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoading: false,
    };
  }

  async fetchArticle() {
    let response = await fetch('https://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json');
    return response.json();
  }

  componentDidMount() {
    this.setState({ isLoading: true });
  
    // Fetch the data for the article and comments.
    this.fetchArticle()
    .then(article => {
      setTimeout( () => {
        console.log(article);
        this.setState({ article, isLoading: false })
      }, 750 );

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
            height: '75vh',
          }}
        >
          <Layout
            style={{
              backgroundColor: 'rgb(249, 249, 249)',
              padding: '3em 6em',
              borderRadius: '8px',
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
