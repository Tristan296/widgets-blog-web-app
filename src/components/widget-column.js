import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
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

  .widget-section{
    background-color: var(--darkBlue);
    width: 200px;
  }

  div{
    padding: 10px;
    height: 99.7%;
    padding-bottom: 0px;
  }

  slot {
    display: flex;
    flex-direction: column;
    gap:10px;
  }

  .widget{

  }
  

  h2{
    visibility:hidden;
  }
  `;

  constructor() {
    super();
    this.header = 'Widgets';
  }

  render() {
    return html`
      <div class="widget-section">
        <h2>${this.header}</h2>
        <slot>
          <meme-widget class="widget"></meme-widget>
          <trufact-widget class="widget"></trufact-widget>
          <joke-widget class="widget"></joke-widget>
          <trivia-widget class="widget"></trivia-widget>
        </slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);