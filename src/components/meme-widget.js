import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../auth.js';

class memeWidget extends LitElement {
  static styles =
    css`
/*Stacey's Style Edit:
VV review below style VV*/
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
  min-width: 100px;
  min-height: 100px;
  background-color: var(--white);
  }
  .widget-border {
    width: 200px;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
  }
/*^^review above style^^*/

      .meme-img {
        width: 100%;
        height: 100%;
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
    _data: { state: true },
    _user: { type: String, state: true }
  }

  constructor() {
    super();
    this._data = null;
    this._user = getUser();
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
        this._data = memes[Math.floor(Math.random() * memes.length)];
      })
      .catch(error => {
        console.error('Encountered an error when fetching meme', error);
      });
  }

  render() {
    if (this._data) {
      return html`
          <div class="widget-border">
            <img class="meme-img" src="${this._data.url}" alt="${this._data.name}">
            <button @click="${this.getNewMeme}">Show New Meme</button>
            <button @click="${this.postMeme}">Post Caption and Image</button>
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

  postMeme() {
    const memeCaption = this._data.name;
    const Authorization = "Basic " + getUser().token;
    const endpoint = "https://comp2110-portal-server.fly.dev/blog";
    const memeData = [this._data.url, " Caption: \'" + memeCaption + "\""]

    const headers = {
      Authorization,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      title: "Meme Caption",
      content: memeData
    });

    // Send the request
    fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: body
    })
      .then(response => response.json())
      .then(data => {
        console.log('Meme caption posted:', data);
        alert("Meme image url and caption sent successfully to blog server!");  
      })
      .catch(error => {
        console.error('Error posting meme caption:', error);
        alert("Error sending meme image url and caption. Please try again.");  
      });
  }

}

customElements.define('meme-widget', memeWidget);