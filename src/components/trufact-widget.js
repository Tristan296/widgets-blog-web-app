import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TrufactWidget extends LitElement {
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