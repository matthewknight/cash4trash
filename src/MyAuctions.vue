<template>
    <div id="content-wrapper">
        <!-- Error Section -->
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div>
            <!-- Banner -->
            <img src="./assets/myauctionsBanner.png">

            <br/><br/>
            <!-- All auctions table -->
            <div id="auctions">
                <div v-for="auction in auctions" :key="auction.id">
                    <h1><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}">{{ auction.title }}</router-link></h1>
                    <div id="auction-photo-wrapper">
                        <img class="img-thumbnail" v-bind:src=auction.photoLink border="5">
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
                currentUser: [],
                auctions: []
            }
        },

        mounted: function () {
            auth.getLoggedInAccount(this, this.getAuctions);
        },

        methods: {
            getAuctions: function () {
                $('#redirectUser').modal('hide');
                this.currentUser = auth.loggedInUser;
                console.log("Calling getAuctions... with id " + this.currentUser.id);

                let params = { "seller" : this.currentUser.id, "status" : 'active' };
                
                this.$http.get('http://localhost:4941/api/v1/auctions', {params: params}).then(
                    function (response) {
                        this.auctions = response.data;
                        this.getPhotos();
                    },
                    function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    }
                )
            },

            getPhotos: function () {
                for (let i = 0; i < this.auctions.length; i++) {
                    this.auctions[i]["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.auctions[i].id + "/photos";
                }
            },
        }
    }
</script>

<style scoped>

</style>
