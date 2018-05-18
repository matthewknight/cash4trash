// src/auth/index.js

import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

import {router} from '../main'

// URL and endpoint constants
const API_URL = 'http://localhost:4941/'
const LOGIN_URL = API_URL + 'api/v1/users/login'

export default {

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    // Send a request to the login URL and save the returned JWT
    login(context, creds) {
        // console.log(LOGIN_URL);
        // this.$http.post(LOGIN_URL, creds, (data) => {
        //     console.log(data);
        //     localStorage.setItem('id_token', data.id)
        //     localStorage.setItem('access_token', data.token)
        //     alert("Logged in!");
        //     this.user.authenticated = true
        // }).error((err) => {
        //     alert("Failed login!");
        // })

        context.$http.post('http://localhost:4941/api/v1/users/login', creds).then(
                    function (response) {
                        $('#loginUser').modal('hide');
                        localStorage.setItem('id_token', response.id)
                        localStorage.setItem('access_token', response.token)
                        alert("Logged in!");
                        this.user.authenticated = true;
                    },
                    function (error) {
                        console.log(error);
                        alert("Failed login!");
                    }
                )
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
