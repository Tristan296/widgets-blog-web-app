import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static properties = {
        _user: { type: String, state: true }, 
    }

    constructor() {
        super();
        this._user = getUser();
    }

    postBlog(event) {
        const blogPost = event.target.blogpost.value;
        const title = event.target.title.value;
        const endpoint = "https://comp2110-portal-server.fly.dev/blog";
        const Authorization = "Basic " + getUser().token;

        const headers = {
            Authorization,
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            title: title,
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

    render(){
        return html`<p>This is currently a placeholder and will be relocated / moved.
        </p>
        <form @submit=${this.postBlog}>blogpost
        <input name="title" type=text id=title>
        <input name="blog" type=textarea id=blogpost>
        <input name="button" type='submit' value='post to blog'>
        </form>`;
    }
}

customElements.define('new-post', NewPost);