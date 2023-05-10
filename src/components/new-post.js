import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static styles = 
    css`
    /*Stacey's Styles*/
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

    button.toggle{
        width: 50px;
        height: 50px;
    }
    `;

    static properties = {
        _user: { type: String, state: true },
        _error: { type: String, state: true },
        _visible: { type: Boolean, state: true },
    }

    constructor() {
        super();
        this._user = getUser();
        this._error = null;
        this._visible = true;
    }

    postBlog(event) {
        let text = event.target.blogpost.value;
        if (text == null || text == "") {
            //this stops the page refreshing on submit
            event.preventDefault();
            this._error = "please write content.";
            console.log(this._error + " User did not enter text field.")
            return;
        } else {
            const blogPost = text;
            const endpoint = "https://comp2110-portal-server.fly.dev/blog";
            const Authorization = "Basic " + getUser().token;
            let title = "Untitled Blog Post";

            if (event.target.title.value != null && event.target.title.value != "") {
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
                    console.log('blog posted:', data);
                })
                .catch(error => {
                    console.error('Error posting to blog:', error);
                });
        } //gets the latest posts & refreshes the screen 
        window.location.reload();
    }

    toggle() {
        if (this._visible === false) {
            this._visible = true;
        } else this._visible = false;
    }

    render() {
        if (this._error && this._visible) {
            return html`<div><p>ERROR: ${this._error}</p> 
            </p>
            <form @submit=${this.postBlog}>blogpost
            <input name="title" type=text id=title>
            <input name="blog" type=textarea id=blogpost>
            <input name="button" type='submit' value='post to blog'>
            </form></div> 
            <div>
            <button @click=${this.toggle()} 
            name="button" class="toggle" type='toggle' value='create post'>
        </div>`
        } else if (this._visible) {
            return html`<div>
        <p> This is currently a placeholder and will be relocated / moved.</p>
        <form @submit=${this.postBlog}>blogpost
            <input name="title" type=text id=title>
            <input name="blog" type=textarea id=blogpost>
            <input name="button" type='submit' value='post to blog'>
        </form></div>
        <div>
            <button @click=${this.toggle()} 
            class="toggle" name="toggle-visibility" 
            type='toggle' value='create post'>
        </div>`
        } else return html`<div><p> This is currently a placeholder and will be relocated / moved.
        </p>
        <form @submit=${this.postBlog}>blogpost
            <input name="title" type=text id=title>
            <input name="blog" type=textarea id=blogpost>
            <input name="button" type='submit' value='post to blog'>
        </form></div>
        <div>
            <button @click=${this.toggle()} 
            class="toggle" name="toggle-visibility" 
            type='toggle' value='create post">
        </div>`
    }

}
customElements.define('new-post', NewPost);