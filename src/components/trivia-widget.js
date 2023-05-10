import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviaWidget extends LitElement{
  static properties = {
    _data: { state: true }

  }

  static styles =
    css`
    .widget-border {
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      text-align: center;

      .widget-border button { 
        background-color: white;
        color: black;
        border-radius: 20px;
        border-style: none;
        transition: ease-out 0.1s;
      }

      .widget-border button:hover { 
        background-color: black;
        color: white;
        transition: ease 0.3s;
        transform: scale(1.05);
      }

      .widget-border button:active {
        background-color: black;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
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
  <h2> Trivia Question! </h2>
  <p> <b> ${this._data.question} </b> </p>
  <p> ${this._data.answer} </p>
  <button @click="${this.getNewQuestion}">Show New Question</button>
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