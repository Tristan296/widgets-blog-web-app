import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../src/auth.js';

class newPost extends LitElement {


/*
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
  }*/
}

  customElements.define('new-post', newPost);