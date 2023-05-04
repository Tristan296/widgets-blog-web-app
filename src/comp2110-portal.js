import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';

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
      display: flex;
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
      grid-template-rows: 22vh 22vh 22vh 25vh 5vh;

      background-color: #669991bf;
      background-image: linear-gradient(45deg, #669991bf, #f7bd60a5, #e66f5fdc, #7d6a83d9), url(https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_1280.png);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
    }

    h1 {
      
      grid-row: 2;
      grid-column: 2;
      font-size: xx-large;
      text-transform: uppercase;
      font-family: 'Press Start 2P', Georgia, serif;

      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;

      background-image: url(https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_1280.png);
      background-position: center;
      background-repeat: repeat;
      background-size: cover;

      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
      opacity: 0.5;

      min-width: 400px;
    }

    login-widget{
      grid-row: 3;
      grid-column: 2;
    }

  

    
  `
  ;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column header="Left">
          <widget-block header="First Widget"></widget-block>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column header="Right">
          <ad-widget></ad-widget>
          <widget-block header="Second Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);