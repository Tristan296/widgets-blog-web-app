/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {

  static properties = {
    _posts: { state: true },
    _update: {state: true},

  }

  static styles = css`
:root {
    --background: #316273;
    --darkBlue: #20315a;
    --pinkHighlight: #c52973; 
    --purpleBody: #832052;
    --white: #f6f6ff;
    --dgray: #4a4a4a;
    --lgray: #bdbdc5;
    --pinkText: #f65273;
    --cyan: #41839c;
    --gold: #a47b39;
    --hay: #decd73;
    --blue: #8bc5cd;
    --width: calc(50vw+20px)
}

  :host {
    margin: 1em;
  }

  .blog-border{
    border-style: solid;
    border-color: var(--dgray);
    border-width: calc(50vw+10vw);
    background-color: var(--dgray);
    }
  .blogpost {
    padding-left: 30px;
    border-style: solid;
    border-color: var(--lgray);
    border-width: 7px;
    width: 50vw;
    text-align: left;
    background-color: var(--white);
  }
  .blogpost p {
    font: serif;
    margin-top: -20px;
  }
  .blogpost h3{
    margin-top: -20px;
  }
  .blogpost h2 {
    margin-top: 5px;
      text-transform: capitalize;
  }
  `;

  constructor() {
    super();
  
    const url = `${BASE_URL}blog`;
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts; 
        });

      
  }

  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library

  //we actually do need this functionality
  //but we need blogpost sanitation first

  //commented out function as do not need to split blog posts
  // static formatBody(text) {
  //   const paragraphs = text.split('\r\n')
  //   return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  // }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    
    return html`
      ${this._posts.map(post => html`
      <div class="blog-border">
        <div class="blogpost">
          <h2>${post.title}</h2>
          <h3>By ${post.name}</h3>
          <p> ${post.content}</p> 
        </div>
      </div>`)}
      `;
  }
}

customElements.define('blog-block', BlockBlock);


//${BlockBlock.formatBody(post.content)} deleted from render function
