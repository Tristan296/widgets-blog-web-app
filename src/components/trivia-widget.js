import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviaWidget extends LitElement{
  static properties = {
    _data: { state: true }

  }

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
    display: flex;
    flex-basis: column;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .content {
    max-height: 300px;
    margin: 0;
    padding: 0;
  }

  .text {
    max-height: 100px;
    overflow-y: scroll;
  }

  div.buttons{
    grid-row:2;
    margin: 0;
    display: flex;
    flex-basis: row;
  }

  #button {
    flex-basis: 1;
  }

  #button {
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


  constructor() {
    super();
    this._data = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTrivia();
  }

  fetchTrivia() {
    fetch(`http://jservice.io/api/random`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this._data = data[0];
      });
  }


  render() {
    if (this._data) {
      return html`
  <div class="widget-border">
      <div class="content">
        <h2> Trivia Question! </h2>
        <div class="text">
          <p> <b> ${this._data.question} </b> </p>
          <p> ${this._data.answer} </p>
        </div>
      <div class="buttons">
        <button @click="${this.getNewQuestion}" id="button">Show New Question</button>
      </div>
    </div>
  </div>`;
    }
    else {
      return html`
    <div class="widget-border">
        <p>Trivia Loading...</p>
      </div>
    `;
    }
  }
  getNewQuestion() {
    this.fetchTrivia();
  }
}
customElements.define('trivia-widget', triviaWidget);