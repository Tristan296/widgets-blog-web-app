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
    <trufact-widget></trufact-widget>
    <meme-widget></meme-widget>
    <joke-widget></joke-widget>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);