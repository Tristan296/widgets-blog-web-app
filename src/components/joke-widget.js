import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class JokeWidget extends LitElement {

    static styles = 
      css`
        .widget-border {
          width: 100px;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          box-sizing: border-box;
          text-align: center;

        }
      `;

      
  static properties = {
    setup: {},
    punchline: {}

}



/* reveal button just changes to css 

first goal: get both to display  (setup then punchline)

*/

constructor() {
  super();
  this._data = null;
}

connectedCallback() {
  super.connectedCallback();
  fetch(`https://official-joke-api.appspot.com/random_joke`)
  .then(response => response.json())
  .then(data => {
    this._data = data;
  });
}

render() {
  
  return html`
  <div class="widget-border">
  <p> JOKE SETUP: ${this.setup}</p>
  <p> JOKE PUNCHLINE: ${this.punchline}</p>
  </div>`;

}
}



      
    
    customElements.define('joke-widget', JokeWidget);