import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
    :host {
        display: block;
    }
    form {
      margin-top: 100px;
      display: grid;
      margin-left: 20%;
      width: 300px;
      grid-columns: 5% 50%, 40% 5%;
      grid-rows: 45%, 5% 5% 45%;
      text-transform: lowercase;
      visibility: hidden; //hides ugly password / username text
    }

    input[type="password"]{
      grid-column: 1;
      grid-row: 2;
      height: 3em;         
      visibility: visible;
    }

    input[name="username"]{
      grid-column: 1;
      grid-row: 1;
      height: 3em;
      visibility: visible;
    }

    input[type="submit"]{
      margin-left: .8px;
      font-size: 13px;
      width: 80%;
      position: relative;
      grid-row: 1/3;
      grid-column:2/3;
      height: 100%;
      visibility: visible;
      transition: ease-out 0.7s;
    }

    input[type="submit"]:hover{
      animation: ease_color 8s infinite;
      color: white;
      font-weight: bolder;
      border: none;
    }

    @keyframes ease_color {
      0% {
        background-color: #CC0000;
      }
      50% {
        background-color: #FFDE00;
      }
      100% {
        background-color: #3B4CCA;
      }
    }
 `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        this.user = response;
        console.log("store " + response);
        storeUser(response);
        window.location.reload();
    })
  }

  logout() {
    deleteUser();
    this.user = null;
    window.location.reload();
  }

  render() {
    let test = JSON.stringify(this.user);
    
    if (test.includes("login incorrect")){
        return html`
        <p>"Error, try again!"</p>
        <form @submit=${this.submitForm}>
            Username: <input name="username" placeholder="Enter Username...">
            Password: <input type="password" placeholder="Enter Password..." name="password">
            <input type='submit' value='Login'>
        </form>`;
      }
      if (this.user != null ) {
        return html`<p>Logged in as ${this.user.name}</p><button @click=${this.logout}>Logout</button>`
    } 
    

    /*else if (this.user.contains("error")){
      return */

    return html`
      <p>"Login to Portal"</p>
        <form @submit=${this.submitForm}>
            Username: <input name="username" placeholder="Enter Username...">
            Password: <input type="password" placeholder="Enter Password..." name="password">
            <input type='submit' value='Login'>
        </form>`;
  }
}

customElements.define('login-widget',  LoginWidget);