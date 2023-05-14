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

    .login{

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

    .logout button {
      background-color: #316273;
            color: #749DAB;
            width: 100px;
            height: 30px;
            border-radius: 9px;
            border: 3px solid #749DAB;
            transition: ease-out 0.1s;
            margin-top: 10px;
        
    }

    .logout button:hover { 
      background-color: #316273;
      color: #749DAB;
      width: 100px;
      height: 50px;
      border-radius: 18px;
      border: 10px solid #749DAB;
      transition: ease-out 0.1s;
      margin-top: 10px;
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
        <p>An error occured, try again!</p>
        <form @submit=${this.submitForm}>
            Username: <input name="username" placeholder="Enter Username...">
            Password: <input type="password" placeholder="Enter Password..." name="password">
            <input type='submit' value='Login'>
        </form>`;
      }
      if (this.user != null ) {
        return html`
        <div class="logout">
        <p> <b>Logged in as ${this.user.name} </b></p><button @click=${this.logout}>Logout</button>
        </div>`
    } 
    

    /*else if (this.user.contains("error")){
      return */

    return html`
      <h2><b>LOGIN TO COMP2110 PORTAL</b></h2>
      <div class="login">
        <form @submit=${this.submitForm}>
            Username: <input name="username" placeholder="Enter Username...">
            Password: <input type="password" placeholder="Enter Password..." name="password">
            <input type='submit' value='Login'>
        </form>;
        </div>`
  }
}

customElements.define('login-widget',  LoginWidget);