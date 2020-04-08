import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import fetchArticle from './fetchArticle';
import { mockArticle } from './mockArticle';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("fetches the article", async () => {
  const data = await fetchArticle();
  expect(data.subreddit).toBe(mockArticle.subreddit);
  expect(data.selftext).toBe(mockArticle.selftext);
  expect(data.title).toBe(mockArticle.title);
  expect(data.subreddit_name_prefixed).toBe(mockArticle.subreddit_name_prefixed)
  expect(data.name).toBe(mockArticle.name);
  expect(data.score).toBe(mockArticle.score);
  expect(data.thumbnail).toBe(mockArticle.thumbnail);
  expect(data.id).toBe(mockArticle.id);
  expect(data.permalink).toBe(mockArticle.permalink);
  expect(data.url).toBe(mockArticle.url);
  expect(data.subreddit_subscribers).toBe(mockArticle.subreddit_subscribers);
  expect(data.created_utc).toBe(mockArticle.created_utc);
  expect(data.is_video).toBe(mockArticle.is_video);
  expect(data.author).toBe(mockArticle.author);
  expect(data.ups).toBe(mockArticle.ups);
  expect(data.comments.length).toBe(mockArticle.comments.length);
});