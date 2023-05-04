import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviaWidget extends LitElement{
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
    trivia: {type: Object},
  }
  constructor() {
    super();
    this.trivia = null;
  }
  connectedCallBack(){
    super.connectedCallBack();
    this.grabTrivia();
  }
  grabTrivia() {
    fetch('http://jservice.io/api/random')
      .then(response => response.json())
      .then(data => {
        this.trivia = data;
      });
    }
    render() {
    if (this._data){
      return html`      
      <div class="widget-border">
      <p>${this._data.question.text}</p>
      <p>${this._data.answer.text}</p>
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