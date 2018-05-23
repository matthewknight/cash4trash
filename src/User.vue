<template>
    <div id="content-wrapper">
        <!-- Error Section -->
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div>
            <!-- Banner -->
            <img src="./assets/userBanner.png">

            <br/><br/>
            <!-- All auctions table -->
            <div>
                <ul class="list-group">
                <li>Username: {{ currentUser.username }}</li>
                <li>First Name: {{ currentUser.givenName }}</li>
                <li>Last Name: {{ currentUser.familyName }}</li>
                <li v-if="ownsAccount">Balance: ${{ currentUser.accountBalance }}</li>
                <li v-if="ownsAccount">Email: {{ currentUser.email }}</li>
                <li><button v-if="ownsAccount" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editProfile">
                    Edit Details
                </button></li>
                </ul>
            </div>

            <!-- Register Modal -->
            <div class="modal fade" id="editProfile">
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
                                    <td><input v-model="newGivenName" type="text"></td>
                                    </tr>
                                    <tr>
                                    <td><input v-model="newFamilyName" type="text"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" v-on:click="checkEditProfile">Update</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>

    import {
        router
    } from './main.js'

    import auth from './auth'
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                currentUser: [],
                auctions: [],
                ownsAccount: false,

                newGivenName: "",
                newFamilyName: ""
            }
        },

        mounted: function () {
            auth.checkAuth(this, this.getUser);
        },

        methods: {
            getUser: function () {
                if (auth.loggedInUser.id === this.$route.params.userId) {
                    console.log("Owns account");
                    this.ownsAccount = true;
                }
                this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.userId, { headers: auth.getAuthHeader() }).then(
                    response => {
                        this.currentUser = response.data;
                        this.newGivenName = this.currentUser.givenName;
                        this.newFamilyName = this.currentUser.familyName;
                    }, error => {
                        if (error.status === 401) {
                            alert("Login/register to see user details");
                            router.go(-1);
                        } else {
                            alert("Failed to get user");
                            console.log(error);
                        }
                        
                    }
                )
            },

            checkEditProfile: function () {
                if (this.newGivenName == '' || this.newGivenName == null) {
                    alert('Please enter a first name');
                    return;
                } else if (/\d/.test(this.newGivenName)) {
                    // Contains numbers
                    alert('Please enter a valid first name.');
                    return;
                }

                if (this.newFamilyName == '' || this.newFamilyName == null) {
                    alert('Please enter a last name');
                    return;
                } else if (/\d/.test(this.newFamilyName)) {
                    // Contains numbers
                    alert('Please enter a valid last name.');
                    return;
                }

                this.submitProfile();
            },

            submitProfile: function () {
                let userData = {
                    'givenName': this.newGivenName,
                    'familyName': this.newFamilyName
                }
                this.$http.patch(
                    'http://localhost:4941/api/v1/users/' + this.$route.params.userId, 
                    userData, {headers: auth.getAuthHeaderSetJSON()}
                ).then(response => {
                    alert("Successfully updated profile");
                    location.reload();
                }, error => {
                    alert("Failed to update profile");
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
