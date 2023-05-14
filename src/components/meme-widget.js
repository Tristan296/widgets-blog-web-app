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
  background-color: var(--white);
  }
  .widget-border {
    display: flex;
    flex-basis: column;
    border: 6px solid var(--pinkHighlight);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: 1em;
    margin: 0;
    padding: 0;
  }

  .content {
    max-height: 250px;
    overflow: hidden;
    margin: 0;
    padding: 20px;
  }

  div.buttons{
    margin: 0;
    min-height: 10px;
    display: flex;
    flex-basis: row;
    flex-wrap: nowrap;
    justify-content: center;
    flex-flow: space-evenly;
  }

  #button {
    flex-basis: 1;
  }

  .meme-img {
    grid-row: 4;
    max-width: 100px;
    height: 40%;
    object-fit: scale-down;
    border-radius: 8px;
  }

  #button {
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

/*^^review above style^^*/


    `;

    /**
     * 
     *      
      
     
     */

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

  getNewMeme() {
    this.fetchMeme();
  }

  postMeme() {
    const memeCaption = this._data.name;
    const user = getUser();
    if (user == null){
      alert("please login first");
    } else {
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

  render() {
    if (this._data) {
      return html`
          <div class="widget-border">
            <div class="content">
              <img class="meme-img" src="${this._data.url}" alt="${this._data.name}">
              <h2>${this._data.name}</h2>
              <div class="buttons">
                <button @click="${this.getNewMeme}" id="button">Show New Meme</button>
                <button @click="${this.postMeme}" id="button">Post Caption and Image</button>
              </div>
            </div>
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

}

customElements.define('meme-widget', memeWidget);