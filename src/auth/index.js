// src/auth/index.js
// import Vue from "vue";
// import VueResource from 'vue-resource';
// Vue.use(VueResource);

import {
    router
} from '../main'

export default {

    user: {
        authenticated: false
    },

    loggedInUser: {},

    getLoggedInAccount(context) {
        console.log("Calling http://localhost:4941/api/v1/users/" + localStorage.getItem('id_token'));

        context.$http.get('http://localhost:4941/api/v1/users/' + localStorage.getItem('id_token'), { headers: this.getAuthHeader() }).then(
            function (response) {
                this.loggedInUser = response.data;
                console.log(this.loggedInUser);
            },
            function (error) {
                alert("Failed to get current logged in account");
            }
        )
    },

    login(context, creds, done) {
        context.$http.post('http://localhost:4941/api/v1/users/login', creds).then(response => {
                $('#loginUser').modal('hide');
                localStorage.setItem('id_token', response.data.id);
                localStorage.setItem('access_token', response.data.token);
                console.log(this.user);
                this.user.authenticated = true;
                console.log("Auth: Setting Auth = true");
                this.getLoggedInAccount(context);
                done();
            }, error => {
                console.log(error);
                alert("Failed login!");
            }
        )
    },

    // To log out, we just need to remove the token
    logout(context, done) {
        console.log("Logging out");
        $('#logoutUser').modal('hide');
        console.log("LOGOUT header: " + this.getAuthHeader()['X-Authorizationx']);
        context.$http.post('http://localhost:4941/api/v1/users/logout', [], { headers: this.getAuthHeader() }).then(response => {
                localStorage.removeItem('id_token')
                localStorage.removeItem('access_token')
                this.user.authenticated = false
                console.log("Auth: Setting Auth = false");
                this.loggedInUser = [];
                done();
            }, error => {
                console.log(error);
                alert("Failed logout!");
            }
        )
    },

    checkAuth(context) {
        console.log("Checking authentication");
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.getLoggedInAccount(context);
            this.user.authenticated = true
            console.log("Auth: Setting Auth = true");
        } else {
            this.user.authenticated = false
            console.log("Auth: Setting Auth = false");
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'X-Authorization': localStorage.getItem('access_token')
        }
    },

    getAuthHeaderSetJSON() {
        return {
            'X-Authorization': localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        }
    },

    getAuthHeaderSetPNG() {
        return {
            'X-Authorization': localStorage.getItem('access_token'),
            "Content-Type": "image/png"
        }
    },

    getAuthHeaderSetJPEG() {
        return {
            'X-Authorization': localStorage.getItem('access_token'),
            "Content-Type": "image/jpeg"
        }
    }



    // Send a request to the login URL and save the returned JWT

}
