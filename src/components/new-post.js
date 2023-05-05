import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static properties = {
        _data: { state: true },
        _user: { type: String, state: true }, 
        _title: { type: String, state: true },
    }

    constructor() {
        super();
        this._user = getUser();
        this._data = null;
        this._title = null;
    }

    postBlog() {
        const blogPost = this._data.name;
        const title = this._title;
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
                console.log('blog posted:', data);
                location.reload();})
            .catch(error => {
                console.error('Error posting to blog:', error);
            });
    }

    render(){
        return html`<p>This is currently a placeholder and will be relocated / moved.
        </p>
        <form>blogpost<input type=text id=title><input type=textarea id=blogpost></form>`;
    }
}

customElements.define('new-post', NewPost);