<template>
    <div id="topnav">
        <ul style="font-weight: bold; font-size: 200%; color: blue;">
            <ul style="float: left;">
                <li><router-link style="color:blue" :to="{ name: 'home'}">Home</router-link></li>
                <li><router-link style="color:orange" :to="{ name: 'auctions'}">Auctions</router-link></li>
            </ul>
            
            <ul style="float: right;">
                <button v-if="!authenticated" type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerUser">
                    Register
                </button>
                <li v-if="!authenticated">&nbsp;</li>
                <button v-if="!authenticated" type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginUser">
                    Login
                </button>
                <li v-if="authenticated" style="color: purple">&#9;Welcome valued user; <b>{{ loggedInUser.username }}</b> </li>
                <li><router-link v-if="authenticated" :to="{ name: 'myauctions' }">My Åuctions</router-link></li>
                <button v-if="authenticated" type="button" class="btn btn-primary" data-toggle="modal" data-target="#logoutUser">
                    Logout
                </button>
            </ul>
        </ul>

        <!-- Register Modal -->
        <div class="modal fade" id="registerUser">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">cash4trash™ Registration</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                <td><input v-model="firstName" type="text" placeholder="First Name"></td>
                                </tr>
                                <tr>
                                <td><input v-model="lastName" type="text" placeholder="Last Name"></td>
                                </tr>
                                <tr>
                                <td><input v-model="username" type="text" placeholder="Username"></td>
                                </tr>
                                <tr>
                                <td><input v-model="email" type="email" placeholder="Email"></td>
                                </tr>
                                <tr>
                                <td><input v-model="password" type="password" placeholder="Password"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" v-on:click="checkRegistration">Register</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Logout Modal -->
        <div class="modal fade" id="logoutUser">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Logout</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        Are you sure you want to logout?
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" v-on:click="logout">Logout</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>

                </div>
            </div>
        </div>


        <!-- Login Form -->
        <div class="modal fade" id="loginUser">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">cash4trash™ Login</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                <td><input v-model="loginUsername" type="text" placeholder="Username"></td>
                                </tr>
                                <tr>
                                <td><input v-model="loginEmail" type="email" placeholder="Email"></td>
                                </tr>
                                <tr>
                                <td><input v-model="loginPassword" type="password" placeholder="Password"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" v-on:click="checkLogin">Login</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from './auth'
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                
                authenticated: auth.user.authenticated,
                loggedInUser: auth.loggedInUser,

                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",

                loginUsername: "",
                loginEmail: "",
                loginPassword: ""
            }
        },

        mounted: function () {
            
            auth.checkAuth(this);
            console.log("NavBar OnMount Auth: " + this.authenticated);
            this.refreshAuthUser();
        },

        methods: {
            checkRegistration: function () {
                console.log("Navbar: checkRegistration called");
                // Check first name
                if (this.firstName == '' || this.firstName == null) {
                    // First name empty
                    alert('Please enter a first name.');
                    return;
                } else if (/\d/.test(this.firstName)) {
                    // Contains numbers
                    alert('Please enter a valid first name.');
                    return;
                }

                // Check last name
                if (this.lastName == '' || this.lastName == null) {
                    // First name empty
                    alert('Please enter a last name.');
                    return;
                } else if (/\d/.test(this.lastName)) {
                    // Contains numbers
                    alert('Please enter a valid last name.');
                    return;
                }

                // Check username
                if (this.username == '' || this.username == null) {
                    // First name empty
                    alert('Please enter a username.');
                    return;
                }

                // Check password
                if (this.password == '' || this.password == null) {
                    // First name empty
                    alert('Please enter a password.');
                    return;
                }

                // Check email
                if (this.email == '' || this.email == null) {
                    // First name empty
                    alert('Please enter an email.');
                    return;
                } else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))) {
                    // Invalid email
                    alert('Please enter a valid email.');
                    return;
                }
                console.log("Navbar: registration passed");
                this.submitNewUser();
            },

            checkLogin: function () {
                let useEmailLogin = false;
                // Check username
                if ((this.loginUsername == '' || this.loginUsername == null) && (this.loginEmail == '' || this.loginEmail == null)) {
                    // First name empty
                    alert('Please enter a username or email.');
                    return;
                }

                if (this.loginUsername == '' || this.loginUsername == null) {
                    // Using email to login
                    useEmailLogin = true;
                }

                // Check password
                if (this.loginPassword == '' || this.loginPassword == null) {
                    // First name empty
                    alert('Please enter a password.');
                    return;
                }

                // Check email
                if (!(this.loginEmail == '' || this.loginEmail == null) && !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.loginEmail))) {
                    // Invalid email
                    alert('Please enter a valid email.');
                    return;
                }
                console.log("Navbar: login input ok");
                this.loginUser();
            },

            loginUser: function () {
                let creds = {
                    'username': this.loginUsername,
                    'email': this.loginEmail,
                    'password': this.loginPassword
                };
                auth.login(this, creds, this.refreshAuthUser);
            }, 

            logout: function () {
                auth.logout(this, this.refreshAuthUser);
            },

            refreshAuthUser: function () {
                console.log("REFRESHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
                this.authenticated = auth.user.authenticated;
                this.loggedInUser = auth.loggedInUser;
            },

            submitNewUser: function () {
                let userData = {
                    'username': this.username,
                    'email': this.email,
                    'password': this.password,
                    'givenName': this.firstName,
                    'familyName': this.lastName
                };
            
                console.log(userData);
                this.$http.post('http://localhost:4941/api/v1/users', userData, {emulateJSON: true}).then(
                    function (response) {
                        $('#registerUser').modal('hide');
                        alert("Successfully registered");
                        this.loginUsername = this.username;
                        this.loginEmail = this.email;
                        this.loginPassword = this.password;
                        this.loginUser();
                        this.refreshAuthUser(); 

                    },
                    function (error) {
                        if (error.body == "Bad Request") {
                            alert("User or email must not be unique");
                        } else {
                            alert("Error creating account");
                             console.log(error);
                        }
                    }
                )
            },

            
        }
    }
</script>

<style scoped>

</style>
