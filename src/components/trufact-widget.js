import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TruFact extends LitElement {
 static properties = {
  date:{type: Date},
  fact: {type: Text}
  }

  constructor() {
    super();
    const date = getDate();
  }

  static styles = css` 
   .trufact-block {
     background-color: red;
     border: 1px solid black;
     padding: 10px;
     margin: 10px;
     width: 500px;
     display: flex;
     flex-direction: column;
   }
   .trufact-block > h2 {
    color: white;
   }
  `;
  

 fetchFact() {
    const url = `http://numbersapi.com/3/22/date`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.fact = data;
      });
  } 

  render() {
    return html`
      <div class="trufact-block">
        <h2>Trufacts About Today's Date</h2>
    `;
  }

}

customElements.define('trufact', TruFact);