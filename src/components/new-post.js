import { getUser } from '../auth.js';
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NewPost extends LitElement {
    static styles = 
    css`
    :root { /*vv DEFAULT STYLE vv*/
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
    }/*^^ default styles ^^ */


    div.menu{
        z-index: -10;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        left: 0;
        height: 30vh;
        width: 100%;
    }

    div.menubar{
        z-index: 2;
        position: relative;
        background-color: var(--purpleBody);
        width: 100%;
        height: 150px;
    }
    
    div.togglebox{
        position: relative;
        display: flex;
        justify-content: center;
        color: var(--pinkHighlight);
    }

    .togglebox > #tog{
        background-color: var(--purpleBody);
        color: var(--pinkHighlight);
        width: 100px;
        height: 50px;
        border-radius: 18px;
        border: 10px solid var(--pinkHighlight);
        transition: ease-out 0.1s;
        margin-top: 10px;
    }

    
   //button formatting//
        .toggle{
            color: var(--pinkHighlight);
        }

       input[name="button"]:hover { 
            background-color: var(--purpleBody);
            color: var(--pinkHighlight);
            width: 100px;
            height: 50px;
            border-radius: 18px;
            border: 10px solid var(--pinkHighlight);
            transition: ease-out 0.1s;
            margin-top: 10px;
        }

        input[name="button"] {
            background-color: var(--purpleBody);
            color: var(--pinkHighlight);
            width: 100px;
            height: 30px;
            border-radius: 9px;
            border: 3px solid var(--pinkHighlight);
            transition: ease-out 0.1s;
            margin-top: 10px;
        }

        //new post formatting
        #title { 
            height: 20px;
            display: flex;
            width: 80%;
            color: var(--dGray);
            background-color: var(--white);
        }

        #blogpost{
            margin: 5px auto auto auto;
            display: flex;
            height: 20vh;
            width: 80%;
            color: var(--dGray);
            background-color: var(--white);
        }

        .visible{
            color: var(--pinkHighlight);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            align-items: stretch;
            left: 0;
            top: 20vh;
            width: 100%;
            height: 46vh;
        }

        .postbox{
            background-color: var(--purpleBody);
            width: fit-content;
            align-self: center;
            width: 30%;
        }

        .flex{
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-content: center;
        }
        label:nth-child(3) { 
            margin-top: 10px;
            display: flex;
            justify-content: center;
        }

        .postbox > #tog{
            margin-top: 100px;
        }

    `;

    static properties = {
        _user: { type: String, state: true },
        _error: { type: String, state: true },
        _visible: { type: Boolean, state: true },
        _handleToggle: {state: true},
        
    }

    constructor() {
        super();
        this._user = getUser();
        this._error = null;
        this._visible = false;
        this.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

/** handleKeyDown(e)
 * This allows the user to hit enter and insert multiple lines within the context
 * of the text box.
 * */

    handleKeyDown(e){
        if (e.key === 'Enter' && !e.shiftKey){
            this.preventDefault();
        }
    }

/** postBlog(event)
 * Posts a new blog post to the server.
 *  - if the user enters a null title, it gives the default title of "Untitled Blog Post".
 *  - if the user enters a null content field, it displays an error.
 *  - dispatch a 'reload' custom event on the global window
 * @param {Event} event clicking the 'post to blog' button
 */
    postBlog(event) {
        //this stops the page refreshing on submit
        event.preventDefault();
        //prevents the user from submitting a null blog post.

        const form = this.shadowRoot.querySelector('form');
        form.reset();


        this._error = null;
        let text = event.target.blogpost.value;
        if (text == null || text == "") {
            this._error = "please write content.";
            console.log(this._error + " User did not enter text field.");
        } else {
            const blogPost = text;
            console.log("user content= " + blogPost);
            const endpoint = "https://comp2110-portal-server.fly.dev/blog";
            const Authorization = "Basic " + getUser().token;
            let title = "Untitled Blog Post"; //default title (used if null)

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
                    if (data.status=='success'){
                        //this reloads the blog only on a successful post (listener in blog-block)
                        const success = new CustomEvent('reload');
                        window.dispatchEvent(success);
                        console.log(success);
                    }
                })
                .catch(error => {
                    console.error('Error posting to blog:', error);
                    this._error = error;
                });
        }
    }

 /** _handleToggle(e)
 * Toggles whether the New Blog Post window is visible or not. 
 * @param {Event} e clicking the toggle button (create post / cancel)
 */
    _handleToggle(e) {
        if (this._visible === false) {
            this._visible = true;
        } else this._visible = false;
        console.log("visibility has changed to " + this._visible + "|" + e);
    }

 /*   firstUpdated(){
        const titleInput = this.shadowRoot.getElementById('input-title');
        const contentInput = this.shadowRoot.getElementById('input-content');
        if (this._visible){
            const submitButton = this.shadowRoot.getElementById('input-title');
        } 
        const toggleButton = this.ShadowRoot.getElementbyId('toggle-button');

        toggleBu
        
        
    }*/

    render() {
        if (this._error && this._visible) {
        return html`
        <div class="menu">
            <div class="menubar"></div>
        </div>
        <div class="visible">
            <div class="postbox">
                <p> New blog post</p> 
                <p>ERROR: ${this._error}</p> 
                <form @submit=${this.postBlog}>
                <label for="title">Title:</label>
                <input name="title" type="text" id="title">
                <label for="blogpost">Content:</label>
                <textarea name="blogpost" id="blogpost"></textarea>
                <input name="button" type='submit' value='post to blog'>
                </form>
                    <div class="togglebox">
                    <input @click=${this._handleToggle} name="button" 
                    type="button" class="toggle" id="tog" value="cancel">
                    </div>
            </div> 
        </div> 
            `
        } else if (this._visible) {
            return html`
        
            <div class="menu">
                <div class="menubar"></div>
            </div>
            <div class="flex">
                <div class="visible">
                    <div class="postbox">
                        <p>New Blog Post</p>
                        <form @submit=${this.postBlog}>
                        <label for="title">Title:</label>
                        <input name="title" type="text" placeholder="Enter title here..." id="title">
                        <label for="blogpost">Content:</label>
                        <textarea name="blogpost" id="blogpost" placeholder="Enter blog post content here..."></textarea>
                        <input name="button" type='submit' value='post to blog'>
                        </form>
                        <div class="togglebox">
                            <input @click=${this._handleToggle} name="button" 
                                type="button" class="toggle" id="tog" 
                                value="cancel">
                        </div>
                    </div>
                </div>
            </div>
            `
        } else return html`
        <div class="menu">&nbsp;
            <div class="menubar"></div>
            </div>
            
            <div class="togglebox">
                <input @click=${this._handleToggle} name="button" 
                    type="button" class="toggle" id="tog" 
                    value="create post">
            </div>

        `
    }

}
customElements.define('new-post', NewPost);