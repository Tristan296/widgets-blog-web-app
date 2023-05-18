import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
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
}

    :host {
        display: block;
        width: 250px;
        height: 250px;
        max-width: fit-content;
    }
    :host p {
      position: relative;
      top: -20px;
      padding: 0px;
      padding-left: 20px;
      padding-right:20px;
      text-align: center;
      z-index: 0;
      font-style: italic;
    }

    img{
      width: 150px;
      padding-top: 5px;
      max-width: fit-content;
    }
    div#advertisement{
      display: flex;
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }
    div#box{
      background: var(--white);
      width: 205px;
      height: 225px;
    }

    div {
  min-width: 100px;
  min-height: 100px;
  }
  .widget-border {
    width: 200px;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
}
@media screen and (max-width: 900px) {
  .widget-border {
    width: 100px;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    text-align: center;
  }
  img{
    margin-top: 30px;
    width: 100px;
    padding-top: 5px;
    max-width: fit-content;
  }
  div#advertisement{
    display: flex;
    width: 152px;
    height: 50%;
    margin-bottom: 10px;
  }
  div#box{
    background: var(--white);
    width: 152px;
    height: 225px;
  }
  :host p {
    position: relative;
    top: -20px;
    padding: 0px;
    padding-left: 10px;
    padding-right:10px;
    text-align: center;
    z-index: 0;
    font-style: italic;
  }
}
  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
  <div id="advertisement" >
    <div id=box class="widget-border">
        <img src=${this.adUrl} alt="Advertisment">
        <p>Advertisment</p>
    </div>
  </div>
    `;
  }
}

customElements.define('ad-widget',  AdWidget);