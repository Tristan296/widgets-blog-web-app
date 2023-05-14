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

class Comp2110Portal extends LitElement {

  static properties = {
    header: { type: String },
    user: { type: String, state: true },
    loginStatus: { type: String},
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

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
  }

  header {
      margin-left: -10px;
      display: grid;
      background-color: #316273;
      background-image: linear-gradient(45deg, #669991bf, #f7bd60a5, #e66f5fdc, #7d6a83d9), url(https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_1280.png);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      max-width: 100vw;
    }

    header >div.menu {
      min-height: 70px;
      grid-row: 4;
      background-color: var(--purpleBody);
      grid-column: 1/4;
    }

    header#login{
      height: 100vh;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 1fr 1fr 70px;
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

    footer.app-footer{
      padding: 20px;
      margin: 0px;
      background-image: 
      url(https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_1280.png);
    }
    p.app-footer{
      color: var(--white);
     }

 
    /*login page css*/
    h1#login{
      grid-row: 4;
      grid-column: 2;
      margin-bottom: -100px;
    }

    login-widget#login{
      grid-row: 2;
      grid-column: 2;
    }

    blog-block#login{
      background-color: var(----purpleBody);
      grid-column: 2;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    main.login-page {
    display: flex;
    flex-basis: row;
    background-color: var(--background);
    overflow: hidden;
    justify-content: space-between;
    gap: 10px;
    align-items: stretch;
    align-content: stretch;
    }




    /**user logged in CSS */

    header#user{
      height: 30vh;
      min-height: 200px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 1fr 1fr 1fr
    }

    h1#user{
      grid-row: 2/3;
      grid-column:1;
    }

    #top {
      background-color: var(--darkblue);
      min-width: 1200px;
      height: fit-content;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      grid-row: 1;
    }

    login-widget#user{
      grid-row: 2; 
      grid-column:3;
    }

    main.user-page{
      display: flex;
      flex-direction: column;
      background-color: var(--background);
      gap: 10px;
      align-items: stretch;
      align-content: stretch;
      justify-content: space-between;
    }


    .user-page > blog-block{
      background-color: var(----purpleBody);
      grid-row: 2;
      grid-column: 2;
      display: flex;
      flex-direction: column;
      padding-left: 90px;
    }

    .wrapper{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    widget-row.#top, widget-block {
      background-color: var(--darkBlue);
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
    
    if (this.user && !JSON.stringify(this.user).includes("login incorrect")) {
      return html`
     <header id="user">
        <h1 id="user">${this.header}</h1>
        <login-widget id="user"></login-widget>
        <div class="menu">
        <new-post></new-post>
        </div>        
      </header>

      
      <main class="user-page">
        <widget-row id="top">
          <widget-block id="widget-block"></widget-block>
        </widget-row>
        <blog-block id="blogs"></blog-block>
      </main>       
        
      <footer class="app-footer"> 
          <p class="app-footer">
          A product of the COMP2110 Web Development Collective &copy; 2023
          </p>
      </footer>
      `;
    }
    else {
      return html`
      <header id="login">
        <h1 id="login">${this.header}</h1>
        <login-widget id="login"></login-widget>
        <div class="menu"></div>
      </header>


      <main class="login-page">
        <widget-column id="Left">
          <widget-block id="firstWidgets"></widget-block>
        </widget-column>
        <blog-block id="login"></blog-block>       
        <widget-column id="Right">
          <widget-block id="secondWidgets"></widget-block>
        </widget-column>
        </main>

        <footer class="app-footer"> 
          <p class="app-footer">
          A product of the COMP2110 Web Development Collective &copy; 2023
          </p>
        </footer>
      
    `;
    }
  }
}

customElements.define('comp2110-portal', Comp2110Portal);