import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviaWidget extends LitElement{
  allQuestions = [];

  static properties = {
    data: {state:true},
    
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
        }
      `;


constructor() {
  super();
  this.data = null;
}

connectedCallback() {
  super.connectedCallback();
  this.fetchTrivia();
}

fetchTrivia() {
  fetch(`triviaquestions.json`)
    .then(response => response.json())
    .then(data => {
        allQuestions = data;
        const randomIndex = Math.floor(Math.random() * this.allQuestions.length);
        this.question = this.allQuestions[randomIndex]
        render();
    })
}

    render() {
    if (this.data){
      return html`      
      <div class="widget-border">
      <h2>Jeopardy Question:</h2>
      <p>it worked</p>
      <p><b>${this.question.question}</b></p>
      <p>${this.question.answer}</p>
    </div>`;
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