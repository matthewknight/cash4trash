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
                {{ currentUser.username }}
                {{ currentUser.givenName }}
                {{ currentUser.familyName }}
                <p v-if="ownsAccount"> {{ currentUser.accountBalance }}</p>
                <p v-if="ownsAccount"> {{ currentUser.email }}</p>
                <p v-if="ownsAccount"> {{ currentUser.password }}</p>
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
                ownsAccount: false
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
        }
    }
</script>

<style scoped>

</style>
