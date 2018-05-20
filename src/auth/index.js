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
    data() {
        return {
            
        }
    },
    

    // Send a request to the login URL and save the returned JWT
    
}
