import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../src/auth.js';

import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/new-post.js';

//trivia widget
import './components/trivia-widget.js';

//trufact widget
import './components/trufact-widget.js';

//meme widget
import './components/meme-widget.js';

//joke widget
import './components/joke-widget.js';

//trivia widget
import './components/trivia-widget.js';

class Comp2110Portal extends LitElement {

  static properties = {
    header: { type: String },
    user: { type: String, state: true },
    loginStatus: { type: String}
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: lightgoldenrodyellow;
    
    }

    main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    header {
      margin-left: -10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      background-color: #669991bf;
      background-image: linear-gradient(45deg, #669991bf, #f7bd60a5, #e66f5fdc, #7d6a83d9), url(https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_1280.png);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
    }

    header#login{
      grid-template-rows: 22vh 22vh 22vh 25vh 5vh;
    }
    header#user{
      grid-template-rows: 1vh 12vh 12vh 5vh 5vh;
    }
      

    h1 {
      font-size: xx-large;
      text-transform: uppercase;
      font-family: 'Press Start 2P', Georgia, serif;
      height: 100%;

      background-image: url(https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_1280.png);


      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;
      
      background-color: white;
      background-position: center;
      background-repeat: repeat;
      background-size: cover;

      background-clip: text;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;

      opacity: 0.5;
      min-width: 400px;
    }

    h1#login{
      margin-top: -100px;
      grid-row: 2;
      grid-column: 2;
      margin-bottom: -100px;
    }

    h1#user{
      grid-row: 2/3;
      grid-column:1;
    }

    login-widget#login{
      grid-row: 2;
      grid-column: 2;
    }

    login-widget#user{
      grid-row: 2; 
      grid-column:3;
    }

    main{
      display: flex;
      background-color: yellow;
    }
    widget-menu{
      height:100%;
      background-color:red;
      display: flex;
      flex-direction: row;
    }

    widget-block{
      background-color: green;
      flex-direction: row;
      grid-column: 3;
    }

    new-post{
      grid-column: 2;
      grid-row: 3;
    }
  `
    ;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
    this.user = getUser();
    this.loginStatus = 'login';
  }



  render() {
    if (this.user) {
      return html`
     <header id="user">
        <h1 id="user">${this.header}</h1>
        <login-widget id="user"></login-widget>
        <new-post></new-post>        
      </header>

      <main>
        
        <widget-column id="Left">
          <widget-block id="First Widget"></widget-block>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column id="Right">
          <ad-widget></ad-widget>
          <widget-block id="Second Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>`;

    }
    else {
      return html`
      <header id="login">
        <h1 id="login">${this.header}</h1>
        <login-widget id="login"></login-widget>
        
      </header>

      <main>
        <widget-menu>
        <widget-column id="Left">
          <widget-block id="firstWidgets"></widget-block>
        </widget-column>
        </widget-menu>
        <blog-block></blog-block>       
        <widget-column id="Right">
          <ad-widget></ad-widget>
          <widget-block id="secondWidgets"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
    }
  }
}

customElements.define('comp2110-portal', Comp2110Portal);