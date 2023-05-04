import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class memeWidget extends LitElement {
  static styles =
    css`
      .widget-border {
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        box-sizing: border-box;
        text-align: center;
      }

      .meme-img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        border-radius: 8px;
      }
      
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
    `;


  static properties = {
    _data: { state: true }
  }

  constructor() {
    super();
    this._data = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchMeme();
  }

  fetchMeme() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        const memes = data.data.memes;
        const randomIndex = Math.floor(Math.random() * memes.length);
        this._data = memes[randomIndex];
      })
      .catch(error => {
        console.error('Error fetching meme', error);
      });
  }

  render() {
    if (this._data) {
      return html`
          <div class="widget-border">
            <img class="meme-img" src="${this._data.url}" alt="${this._data.name}">
            <button @click="${this.getNewMeme}">Show New Meme</button>
            <p>${this._data.name}</p>
          </div>
        `;
    } else {
      return html`
          <div class="widget-border">
            <p>Loading...</p>
          </div>
        `;
    }
  }

  getNewMeme() {
    this.fetchMeme();
  }
}

customElements.define('meme-widget', memeWidget);