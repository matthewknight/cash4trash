<template>
    <div>
        <!-- Error Section -->
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div>
            <!-- Banner -->
            <img src="./assets/singleAuctionBanner.png">
            <br/><br/>

            <!-- Single auction view -->
            <div id="auction">
                <router-link :to="{ name: 'auctions'}">Back to Auctions</router-link>
                <br/><br/>
                <h1>{{ auction.title }}</h1>
                <p>{{ auction.description }}</p>
                <img class="img-responsive" v-bind:src=auction.photoLink>
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
                auction: [],
                seller: [],
                bids: []
            }
        },

        mounted: function () {
            this.getAuction();
        },

        methods: {
            getAuction: function () {
                console.log("Auction.vue: Calling getAuction");
                console.log(this.$route.params.auctionId);
                this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId).then(
                    function (response) {
                        console.log(response.body);
                        this.auction = response.data;
                        this.auction["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + "/photos";
                        this.getSeller();
                    },
                    function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    }
                )
            },

            getSeller: function () {
                console.log("Auction.vue: Calling getSeller");

            }

        }
    }
</script>

<style scoped>
/* #Picture {
    background-image:url('assets/default-placeholder.png');
} */
</style>
