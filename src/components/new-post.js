import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static properties = {
        _user: { type: String, state: true },
        _error: {type: String, state: true}
    }

    constructor() {
        super();
        this._user = getUser();
        this._error = null;
    }


    storeError(theError){
    window.localStorage.setItem('error', theError);
    }

    postBlog(event) {          
        let text = event.target.blogpost.value;             
        if (text == null || text == ""){
        //this stops the page refreshing on submit
        event.preventDefault();
        this._error = "please write content.";
        console.log(_error)
        return;
        } else {
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
        } window.location.reload();
    }

    render(){
       if (this._error){
            return html`<div><p>ERROR: ${this._error}</p> 
            </p>
            <form @submit=${this.postBlog}>blogpost
            <input name="title" type=text id=title>
            <input name="blog" type=textarea id=blogpost>
            <input name="button" type='submit' value='post to blog'>
            </form></div> `
            };  
       return html`<p> This is currently a placeholder and will be relocated / moved.
        </p>
        <form @submit=${this.postBlog}>blogpost
        <input name="title" type=text id=title>
        <input name="blog" type=textarea id=blogpost>
        <input name="button" type='submit' value='post to blog'>
        </form>`
    }
}
customElements.define('new-post', NewPost);