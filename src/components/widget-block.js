import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
      city: { type: String },
      forecast: { type: Array },
  }

  constructor() {
    super();
    this.city = '';
    this.forecast = [];
  }

  static styles = css` 
   .weather-widget {
     border: 1px solid black;
     padding: 10px;
     margin: 10px;
     width: 500px;
     display: flex;
     flex-direction: column;
   }
   
   .weather-widget h2 {
     margin-top: 0;
   }
   
   .weather-widget input[type=text] {
     width: 100%;
     padding: 12px 20px;
     margin: 8px 0;
     box-sizing: border-box;
     border: 2px solid #ccc;
     border-radius: 4px;
   }
   
   .weather-widget button {
     background-color: #4CAF50;
     color: white;
     padding: 12px 20px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
   }
   
   .weather-widget button:hover {
     background-color: #45a049;
   }
   
   .weather-widget ul {
     list-style: none;
     margin: 0;
     padding: 0;
   }
   
   .weather-widget li {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 10px;
   }
  `;
  

  _fetchForecast() {
    const url = `https://api.open-meteo.com/v1/forecast?city=${this.city}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.forecast = data;
      });
  }

  render() {
    return html`
      <div class="widget-block">
        <h2>Weather Widget</h2>
        <input type="text" placeholder="Enter city name" @input="${e => this.city = e.target.value}">
        <button @click="${this._fetchForecast}">Get forecast</button>
        <ul>
          ${this.forecast.map(day => html`
            <li>
              <span>${day.datetime}</span>
              <span>${day.temp}°C</span>
              <span>${day.weather.description}</span>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

}

customElements.define('widget-block', WidgetBlock);