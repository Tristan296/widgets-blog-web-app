import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TrufactWidget extends LitElement {
  static styles = 
    css`
/*Stacey's Styles*/
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
/*end styles*/
    `;

  static properties = {
    date: {type: Date},
    _data: {state: true}
  }

  static BASE_URL = "http://numbersapi.com/";

  constructor() {
    super();
    this.date = new Date();
  }

  connectedCallback() {
    super.connectedCallback();
    const url = TrufactWidget.BASE_URL + this.date.getMonth() +'/' + this.date.getDay() + '/date?json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this._data = data;
      });
  }

  render() {
    if (this._data){
      return html`      
      <div class="widget-border">
      <h2>On this day...</h2>
      <p>${this._data.text}</p>
    </div>`
    } else {
    return html`
      <div class="widget-border">
        <h2>On this day...</h2>
        <p>...loading a fact!</p>
      </div>
    `;
    }
  }

}

customElements.define('trufact-widget', TrufactWidget);