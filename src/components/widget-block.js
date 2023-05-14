import '../components/ad-widget.js';

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../auth.js';
class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
    user: { type: String, state: true },
  }

  static styles = css`
  div#columns{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  div#rows{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
  }

  .widget{
    flex-grow: 1;
  }
  `;

  constructor() {
    super();
    this.header = 'Widget';
    this.user = getUser();
  }

  render() {
   if (this.user && !JSON.stringify(this.user).includes("login incorrect")) {
      return html`
      <div id="rows">
      <ad-widget class=widget></ad-widget>
      <meme-widget class=widget></meme-widget>
      <trufact-widget class=widget></trufact-widget>
      <joke-widget class=widget></joke-widget>
      <trivia-widget class=widget></trivia-widget>
      <ad-widget class=widget></ad-widget>
      </div>`
     } else return html`
      <div id="columns">
      <ad-widget></ad-widget>
      <meme-widget></meme-widget>
      <trufact-widget></trufact-widget>
      <joke-widget></joke-widget>
      <trivia-widget></trivia-widget>
      <ad-widget></ad-widget>
      </div>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);