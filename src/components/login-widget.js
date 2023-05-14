import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
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
      row-gap: 0px;
      text-transform: lowercase;
      visibility: hidden; //hides ugly password / username text
    }

    input[type="password"]{
      margin-top: 1em;
      border-radius: 10px;
      grid-column: 1;
      grid-row: 2;
      height: 3em;         
      visibility: visible;
      border-color: white;
    }

    input[name="username"]{
      border-radius: 10px;
      grid-column: 1;
      grid-row: 1;
      height: 3em;
      visibility: visible;
      border-color: white;

    }

    input[type="submit"]{
      border-radius: 10px;
      margin-left: 1em;
      font-size: 13px;
      width: 80%;
      position: relative;
      grid-row: 1/3;
      grid-column:2/3;
      visibility: visible;
      transition: ease-out 0.7s;
    }

    input[type="submit"]:hover{
      animation: ease_color 8s infinite;
      color: white;
      border: none;
    }

    .logout>#button{
      background-color: var(--background);
      color: var(--blue);
      border-radius: 9px;
      border: 6px solid var(--cyan);
      padding: 3px;
      padding-left:10px;
      padding-right:10px;
    }

    .login>#button {
      background-color: var(--background);
      color: var(--blue);
      width: 100px;
      height: 30px;
      border-radius: 9px;
      border: 3px solid var(--dgray);
      transition: ease-out 0.1s;
    }

     #button:hover { 
      border: 6px solid var(--dgray);
      transition: ease-out 0.1s;
  }

    @keyframes ease_color {
      0% {
        background-color: #CC0000;
  
      }
      50% {
        background-color: #FFDE00;
        color: var(--dgray);
      }
      100% {
        background-color: #3B4CCA;
      }
    }

    .login h2{
      font-size: 3.5em;
      font-family: garamond;
      text-transform: uppercase;
    }
  
    .login h3{
      font-size: 2em;
      font-variant: small-caps;
      font-family: garamond;
    }

    div.login{
      display: flex;
      flex-direction: column;
      justify-content: center;
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
        <div class="login">
        <h2>Login to COMP2110 Portal</h2>
          <h3><b>An error occured, try again!</b></h3>
          <form @submit=${this.submitForm}>
              Username: <input name="username" placeholder="Enter Username...">
              Password: <input type="password" placeholder="Enter Password..." name="password">
              <input id="button" type='submit' value='Login'>
          </form>
        </div>
        `;
      } else if (this.user != null) {
        return html`
        <div class="logout">
          <p><b>Logged in as ${this.user.name} </b></p>
          <button id="button" @click=${this.logout}>Logout</button>
        </div>
        `;
    } else return html`
      <div class="login">
        <h2>Login to COMP2110 Portal</h2>
        <form @submit=${this.submitForm}>
        Username: <input name="username" placeholder="Enter Username...">
        Password: <input type="password" placeholder="Enter Password..." name="password">
        <input id="button" type='submit' value='Login'>
        </form>
      </div>
      `;
  }
}

customElements.define('login-widget',  LoginWidget);