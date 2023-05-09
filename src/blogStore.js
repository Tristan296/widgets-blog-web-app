// These functions provide an interface to logged in users
// store the current user in localStorage so that it persists
// over browser sessions.
// storeUser and deleteUser dispatch a custom event that can 
// be intercepted by other parts of the application to do 
// something on login/logout

/**
 * Store information about a logged in user, called on login
 *  - dispatch a 'user' event on the global window 
 * @param {Object} blogInfo blog information as returned by the blog server
 */
export const storeBlog = (blogInfo) => {
    window.localStorage.setItem('blog', JSON.stringify(blogInfo));
   // const event = new CustomEvent('blog', {action: 'reload?'});
    //window.dispatchEvent(event);
    window.location.reload();
}

/**
 * delete the current user information if any, called on logout
 *  - dispatch a 'user' event on the global window 
 
export const deleteUser = () => {
    window.localStorage.removeItem('user');
    const event = new CustomEvent('user', {action: 'logout'}); 
    window.dispatchEvent(event);
}
*/

/**
 * Get information about the current user, if any. 
 * @returns the user object if logged in or null if not
 */
export const getBlog = () => {
    const userInfo = window.localStorage.getItem('blog');
    if (userInfo) {
        console.log(userInfo);
        return JSON.parse(userInfo);
    } 
    return null;
}

