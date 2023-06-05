import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../auth.js';
class TrufactWidget extends LitElement {
  static styles =
    css`
/*default styles*/
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
  div {
  background-color: var(--white);
  }

  .widget-border {
    max-height: 300px;
    max-width: 400px;
    display: flex;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    padding: 0;
    
  }
  h2 {
    margin: 0;
    padding: 0;
  }

  .content {
    max-height: 250px;
    overflow: hidden;
    margin: 0;
    padding: 20px;
  }
  .text {
    max-height: 100px;
    overflow-y: scroll;
  }

  div.buttons{
    padding-top: 4px;
    grid-row: 2;
    margin: 0;
    display: flex;
    flex-basis: row;
  }

  #button {
    padding-top: 4px;
    flex-basis: 1; 
    background-color: var(--hay);
    color: var(--gold);
    border: 6px solid var(--gold);
    border-radius: 20px;
    transition: ease-out 0.1s;
  }

  #button:hover { 
  background-color: var(--gold);
  color: var(--white);
  border: 6px solid var(--hay);
  transition: ease 0.3s;
  transform: scale(1.05);
  }

  #button:active {
    border: 6px solid var(--blue);
    background-color: var(--cyan);
    transform: translateY(4px);
  }

    `;

  static properties = {
    _data: { state: true },
    _handleRefresh: { state: true },
  }

  static BASE_URL = "http://numbersapi.com/";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.todayFact();
  }

  todayFact() {
    let date = new Date();
    let month = date.getMonth() +1;
    let day = date.getDate();
    const url = TrufactWidget.BASE_URL + month + '/' + day + '/date?json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this._data = data;
      });
  }
d
  _handleRefresh(e) {
    this.connectedCallback();
  }

  _handleShare(e) {
    let user = getUser();
    if (user === null || JSON.stringify(user).includes("incorrect")) {
      alert("Please login to share facts.")
      return;
    }
    const shareFact = new CustomEvent('share-fact', { detail: this._data.text });
    window.dispatchEvent(shareFact);
    console.log("fact dispatched: " + shareFact.type + shareFact.detail);
    this.todayFact();
  }

  render() {
    if (this._data) {
      return html`      
      <div class="widget-border">
        <div class="content">
          <h2>On this day in history:</h2>
            <div class="text">
            <p>${this._data.text}</p>
            </div>
          <div class="fact-buttons">
            <input @click=${this._handleRefresh} id="button" type="button" value="new fact">
            <input @click=${this._handleShare} id="button" type="button" value="share fact">
          </div>
      </div>
    <div>`
    } else {
      return html`
      <div class="widget-border">
        <input @click=${this._handleRefresh} id="button" value="new fact">
        <input @click=${this._handleShare} id="button" type="button" value="share fact">
        <h2>On this day...</h2>
        <p>...loading a fact!</p>
      </div>
    `;
    }
  }
}

customElements.define('trufact-widget', TrufactWidget);