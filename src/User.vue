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
            auth.getLoggedInAccount(this, this.getUser);
        },

        methods: {
            getUser: function () {
                $('#redirectUser').modal('hide');
                this.$http.get('http://localhost:4941/api/v1/users/' + this.$route.params.userId, { headers: auth.getAuthHeader() }).then(
                    response => {
                        this.currentUser = response.data;
                        if (response.data.accountBalance !== undefined) {
                            //Logged in owns this account
                            this.ownsAccount = true;
                        }
                    }, error => {
                        alert("Failed to get user");
                        console.log(error);
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>
