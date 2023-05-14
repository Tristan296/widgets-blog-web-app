/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * It inserts this into the HTML: <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {

  static properties = {
    _posts: { state: true },
    _number: { type: Number, state: true },
    _url: {type: String, state: true},
    _timerInterval: {type: Number},
    reloadListener: {type: Function},
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



  .blogpost p {
    font: serif;
    margin-top: -20px;
    word-break: break-all;
  }
  .blogpost h3{
    margin-top: -20px;
    word-break: break-all;
  }
  .blogpost h2 {
    word-break: break-all;
    margin-top: 5px;
    text-transform: capitalize;
  }

  h4{
    margin-top: -20px;
  }
  .meme-img { 
    width: 150px;
    border: 5px solid black;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .blogpost p {
      font: serif;
      word-break: ellipse;
    }

    h1.loading{
      padding: 100px;
      text-transform: uppercase;
    }

    div.loading{
      height: 100vh;
    }

  .blog-border{
    position: relative;
    top: 0;
    left: -1%;
    width: 98%;
    border-radius:20px;
    border-style: solid;
    border-color: var(--dgray);
    background-color: var(--dgray);
  }
  .blogpost {
    padding: 20px;
    border-radius:20px;
    border-style: solid;
    border-color: var(--lgray);
    border-width: 7px;
    text-align: left;
    background-color: var(--white);
  }

  .information{
    display: grid;
    gap: 0px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    max-height: 100px;
    padding: 0px;
    margin: 0px;
  }

  .information h2 {
    grid-column: 1/3;
    grid-row: 1;
  }

  .information h3 {
    grid-column: 1/3;
    grid-row: 2;
    text-transform: lowercase;
  }

  .information h4{
    grid-column: 5;
  }

  .information> h4.date{
    grid-row: 1;
    padding-top: 20px;
  }

  .information h4.time{
    grid-row:2;
  }

 
  `;

/* constructor() notes:
 * called when element is created and invoked when element is upgraded.
 * - adds _url string for use within blog-block.  
 * - adds 'reload' event listener to global window
 * 
 * !! - 'reload' event listener important note - !!
 *   as variables in Lit constructors are added EACH time the the blog reloads
 *   with event listeners only listening for one 'event' before reloading.
 *   All functions that wish to reload the blog should use a 'reload' custom event.       
 *   EG: 
 *       const reload = new CustomEvent('reload');
 *       window.dispatchEvent(reload);
 *       
**/
  constructor() {
    super();
    this._url = `${BASE_URL}blog`;
    this.factListener = this.connectedCallback.bind(this);
    window.addEventListener('success', this.successListener); //added to ensure it is always present
    
    this.reloadListener = this.connectedCallback.bind(this);
    window.addEventListener('reload', this.reloadListener); //added to ensure it is always present
    this.countPosts(this._url); //sets _numbersD
    console.log("blog-block constructor");
  }
/** connectedCallback()
 * setup tasks that should only occur when element is connnected to the document.
 *  
 *  - */
  
connectedCallback(){
  super.connectedCallback();
  this.createBlog(this._url); //sets _posts
  this._reloadBlog();
  console.log("blog-block connectedCallback");
}

  disconnectedCallback(){
    window.removeEventListener('reload', this.reloadListener);
    console.log("blog-block disconnectedCallback");
  }

  createBlog(url) {
    fetch(url)
      .then(response => response.json())
      .then(posts => {
        this._posts = posts.posts;
        this.giveTitles(this._posts);
        this._posts.forEach(post => {
          console.log(`"id": ${post.id}`);
          console.log(`"title": ${post.title}`);
          console.log(`"content": ${post.content}`);
          console.log(`"timestamp": ${post.timestamp}`);
          console.log(`"creator": ${post.creator}`);
          console.log(`"name": ${post.name}`);
          console.log('---');
        });
      })
      .catch(error => console.error('Error:', error));
    console.log("blog-block createblog");
  }

  countPosts(url) {
    fetch(url)
      .then(response => response.json())
      .then(posts => {
        this._number = posts.posts[0].id;
        console.log(this._number);
      });
      console.log("blog-block countposts");
  }

  /** If a post lacks a title, null, NaN, "" or 0, this gives it a title. 
   * It also sanitises names, because when it didn't the name ceased displaying.
  ** @param {Object} posts the most recent 10 posts loaded */

  giveTitles(posts) {
    console.log(posts[0]);
    this._posts = this._posts.map(post => {
      return {
        title: post.title ? this.sanitise(post.title) : 'Untitled Blog Post',
        content: post.content ? this.sanitise(post.content) : '[User Submitted Blank Content]',
        name: this.sanitise(post.name),  
        timestamp: post.timestamp,
        id: post.id, 
        creator: post.creator,
      };
    });
  }

  /* sanitisePosts(posts)
  * This uses filter() which creates a shallow copy of a portion of an array
  * filtering to just the elements that pass the test implemented by the
  * provided function. In this case, that the post !== null
  * 
  ** @param {Object} posts the most recent 10 posts loaded */

  sanitisePosts(posts) {
    console.log(posts)
    // Remove any null posts
    this._posts = posts.filter(post => post !== null);
    // Sanitize content of each post
    this._posts = this._posts.map(post => {
      return {
        title: this.sanitise(post.title),
        name: this.sanitise(post.name),
        content: this.sanitise(post.content),
      };
    });
  }

  /* sanitise(text)
  *  this uses regex to attempt to match <script> tags to prevent XSS attack.
  *  while Lit uses HTML templating for rendering web components, it is still
  *  important to ensure that user input is properly sanitised and validated
  *  before it is rendered to the page.
  * @param {Object} text: the text to be examined */

  sanitise(text) {
    // removes < > " ' `
    if (text.includes('<img>')){
      return text;
    }else return text.replace(/[<>"'`]/g, '');
  }

/** _reloadBlog()
 * creates a server tick which will trigger the connectedCallback() function.
 * The time is in ms, eg 10000 = 10 seconds. 90000 = 90 seconds.
 *  - dispatch a 'reload' event on the global window */
  _reloadBlog() { 
    clearTimeout(this._timerInterval);
    this._timerInterval = setTimeout(() => {
      const reload = new CustomEvent('reload');
      window.dispatchEvent(reload);
      console.log("event created:"+ reload.type);
      }, 30000);  //NB TURNED THIS DOWN FOR TESTING
  }

  //Create a date from the timestamp field in 'posts'.
  getBlogPostDate(timestamp) { 
    //console.log("blog-block getBlogPostDate");
    var time = new Date(timestamp).toLocaleTimeString("en-us");
    var date = new Date(timestamp).toLocaleDateString("en-US");
    return {
      time, date
    };
  }


  /*formatBody(text)*/

 // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    console.log("blog-block formatBody");
    if (text == null || text == ""){
      return text;
    }
    else {
  const paragraphs = text.split('\r\n')
  return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
}

  render() {
    console.log("blog-block render");
    if (!this._posts)
      return html`<div class="loading"><h1>Loading...</h1></div>`

    else return html`
      ${this._posts.map(post =>
      html`
      <div class="blog-border">
        <div class="blogpost">
          <div class="information">
            <h2>${post.title}</h2>
            <h3>By ${post.name}</h3>
            <h4 id="date" style="font-weight: bold;">Date Posted: ${this.getBlogPostDate(post.timestamp).date}</p>
            <h4 id="time" style="font-weight: bold;">Time Posted: ${this.getBlogPostDate(post.timestamp).time}</p>
          </div>
          <div class="content">
          <p id="post-content"> ${post.content}</p> 
          ${post.title === "Meme Caption" ? html`<img class="meme-img" alt="couldn't load meme image" src="${post.content.split(',')[0]}"></img>` : ''}
          </div>   
         </div>
      </div>`
    )}
      `;
  }
}

customElements.define('blog-block', BlockBlock);


