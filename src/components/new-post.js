import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static properties = {
        _user: { type: String, state: true },
       // _error: {type: string, state: true}
    }

    static styles = 
    //trying to format the submit buttons
        css `{

            input[type="submit"]{
                background-color: white;
                color: black;
                border-radius: 20px;
                border-style: none;
                transition: ease-out 0.1s;
              }
        
              input[type="submit"]:hover { 
                background-color: black;
                color: white;
                transition: ease 0.3s;
                transform: scale(1.05);
              }
        
              input[type="submit"]:active {
                background-color: black;
                box-shadow: 0 5px #666;
                transform: translateY(4px);
              }
    }
    `

    constructor() {
        super();
        this._user = getUser();
       // this._error = window.localStorage.getItem('error');
    }


    storeError(theError){
    window.localStorage.setItem('error', theError);
    }

    postBlog(event) {
        //this stops the page refreshing on submit
        event.preventDefault();
        let text = event.target.blogpost.value;
        
        
        let test = "ok";
        if (text == null || text == ""){
            text = "silly";
        }
        
        else if (test === "ok"){
        const blogPost = text;

        const endpoint = "https://comp2110-portal-server.fly.dev/blog";
        const Authorization = "Basic " + getUser().token;
        let title = "Untitled Blog Post";
        
        if (event.target.title.value != null && event.target.title.value != ""){
        title = event.target.title.value;
        }

        const useThis = title;
        const headers = {
            Authorization,
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            title: useThis,
            content: blogPost
        });

        // Send the request
        fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log('blog posted:', data);})
            .catch(error => {
                console.error('Error posting to blog:', error);
            });
        }
    }

    render(){
       /* if (true){
            return html`<div><p>ERROR: ${this_error}</p> 
            </p>
            <form @submit=${this.postBlog}>blogpost
            <input name="title" type=text id=title>
            <input name="blog" type=textarea id=blogpost>
            <input name="button" type='submit' value='post to blog'>
            </form></div> `
            };  */
       return html`<p> This is currently a placeholder and will be relocated / moved.
        </p>

        <div class="form-submit">
        <form @submit=${this.postBlog}>blogpost
        <input name="title" type=text id=title>
        <input name="blog" type=textarea id=blogpost>
        <input name="button" type='submit' value='post to blog'>
        </form>

        </div>`
    }
}
customElements.define('new-post', NewPost);