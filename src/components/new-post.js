import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static properties = {
        _data: { state: true },
        user: { type: String, state: true }, 
        auth: { type: String, state: true },
    }

    constructor() {
        super();
        this.user = getUser();
        this.data = null;
    //    this.auth = getAuth();
    }

    getAuth(){
    //    return this.user.Authorization;
    }

    postBlog() {
        const blogPost = this._data.name;
        const endpoint = "https://comp2110-portal-server.fly.dev/blog";

        const headers = {
            'Authorization': 'Basic 8f590303-0179-4d1b-9c19-586f20e83efd',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            title: "Meme Caption",
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
    }

    render(){
        return html`<p>This is where I am going to build a form to fill in for a new post. 
            This is currently a placeholder and will be relocated / moved.
        </p>`;
    }
}

customElements.define('new-post', NewPost);