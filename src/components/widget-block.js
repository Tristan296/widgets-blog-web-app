import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
  div{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }


  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
      <div>
      <meme-widget class="widget"></meme-widget>
      <trufact-widget></trufact-widget>
      <joke-widget></joke-widget>
      <trivia-widget></trivia-widget>
      </div>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);