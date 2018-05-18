// src/auth/index.js

import {
    router
} from '../index'

// URL and endpoint constants
const API_URL = 'http://localhost:4941/'
const LOGIN_URL = API_URL + 'api/v1/users/login'

export default {

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    // Send a request to the login URL and save the returned JWT
    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
            localStorage.setItem('id_token', data.id)
            localStorage.setItem('access_token', data.token)

            this.user.authenticated = true

            // Redirect to a specified route
            if (redirect) {
                router.go(redirect)
            }
        }).error((err) => {
            context.error = err
        })
    },

    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        this.user.authenticated = false
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
        } else {
            this.user.authenticated = false
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'X-Authorization': localStorage.getItem('access_token')
        }
    }
}