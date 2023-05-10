import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviaWidget extends LitElement{
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
    
  `;

  static properties = {    
    _data: {state:true}
  }
  constructor() {
    super();
    this._data = null;
  }
  connectedCallBack(){
    super.connectedCallBack();
    this.grabTrivia();
  }
  grabTrivia() {
    fetch('http://jservice.io/api/random')
      .then(response => response.json())
      .then(data => {
        this._ = data;
      });
    }
    render() {
    if (this._data){
      return html`      
      <div class="widget-border">
      <h2>Jeopardy Question:</h2>
      <p>${this._data.question}</p>
      <p>${this._data.answer}</p>
    </div>`
    } else {
    return html`
      <div class="widget-border">
        <h2>Jeopardy Question:</h2>
        <p>Loading Question...</p>
      </div>
    `;
    }
  }
}
customElements.define('trivia-widget', triviaWidget);