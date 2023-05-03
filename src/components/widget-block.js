import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
      <meme-widget></meme-widget>
      <trufact-widget></trufact-widget>
      <joke-widget></joke-widget>
      <trivia-widget></trivia-widget>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);