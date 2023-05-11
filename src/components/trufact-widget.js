import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TrufactWidget extends LitElement {
  static styles = 
    css`
/*DEFAULT STYLE START*/
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
/*DEFAULT STYLES FINISH*/
//write override styles below
    `;

  static properties = {
    _date: {type: Date},
    _data: {state: true},
    _handleRefresh: {state: true},
  }

  static BASE_URL = "http://numbersapi.com/";

  constructor() {
    super();
    this._date = new Date();
    this.connectedCallback();
  }

  connectedCallback() {
    super.connectedCallback();
    this.todayFact();
  }

  todayFact(){
    const url = TrufactWidget.BASE_URL + this._date.getMonth() +'/' + this._date.getDay() + '/date?json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this._data = data;
      });
  }

  _handleRefresh(e){
    this.connectedCallback();
  }

  render() {
    if (this._data){
      return html`      
      <div class="widget-border">
      <h2>On this day...</h2>
      <p>${this._data.text}</p>
      <input @click=${this._handleRefresh} type="button" value="new fact"></button>
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