import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class JokeWidget extends LitElement {

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
          margin: 20px;
          


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
    this.fetchJoke();
  }

  fetchJoke() {
    fetch(`https://official-joke-api.appspot.com/random_joke`)
      .then(response => response.json())
      .then(data => {
        this._data = data;
      });
  }


  render() {
    if (this._data) {
      return html`
  <div class="widget-border">
  <h2> Joke! </h2>
  <p> <b> ${this._data.setup} </b> </p>
  <p> ${this._data.punchline} </p>
  <button @click="${this.showPunchline}">Show Punchline</button>
  <button @click="${this.getNewJoke}">Show New Joke</button>
  </div>`;
    }
    else {
      return html`
    <div class="widget-border">
        <p>joke loading...</p>
      </div>
    `;
    }
  }

  getNewJoke() {
    this.fetchJoke();
  }

  showPunchline() {
    var p = this._data.punchline;
    if (p.styles.display === "none") {
      p.styles.display = "block";
    } else {
      p.styles.display = "none";
    }
  }
}


/* is working but is slow - do not know if need this.getNewJoke() or without ()*/

customElements.define('joke-widget', JokeWidget);