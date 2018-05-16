<template>
    <div id="topnav">
        <ul>
            <li><router-link :to="{ name: 'home'}">Home</router-link></li>
            <li><router-link :to="{ name: 'auctions'}">Auctions</router-link></li>
            <li>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerUser">
                    Register
                </button>
            </li>
        </ul>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                validRegistration: false,
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: ""
            }
        },

        mounted: function () {
        },

        methods: {
            checkRegistration: function () {
                this.validRegistration = false;
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

                // Check email
                if (this.email == '' || this.email == null) {
                    // First name empty
                    alert('Please enter an email.');
                    return;
                } else if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))) {
                    // Invalid email
                    alert('Please enter a valid email.');
                }

                console.log("Valid registration");

            }
        }
    }
</script>

<style scoped>

</style>
