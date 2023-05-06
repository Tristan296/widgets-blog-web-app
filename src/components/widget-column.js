import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`

  
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
          <meme-widget></meme-widget>
          <trufact-widget></trufact-widget>
          <joke-widget></joke-widget>
          <trivia-widget></trivia-widget>
        </slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);