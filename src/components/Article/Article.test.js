import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import Article from "./article";
import { mockArticle } from "../../utils/mockArticle";

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

describe('The reddit article component.', () => {
  it("renders a 404 page if the article prop isn't passed", () => {
    act(() => {
      render(<Article />, container);
    });
    expect(container.textContent).toBe("Post not Found!Sorry, the reddit post you visited does not exist.Back Home");
  });

  it('renders the reddit article component correctly.', () => {
    const tree = renderer
      .create(<Article article={mockArticle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});