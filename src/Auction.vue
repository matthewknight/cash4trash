<template>
    <div id="content-wrapper">
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
                <span>Start Date: {{ auction.startDateString }} End Date: {{ auction.endDateString }}</span>
                <br/><br/>
                <h3>Seller Username: {{ seller.username }}</h3>
                <h3>Seller ID: {{ seller.id }}</h3>
                <p>{{ auction.description }}</p>
                <div style="margin:auto">
                    <div style="float:left">
                        <h4> Bids </h4>
                        <div v-if="bids.length === 0">
                            <p> No bids yet! </p>
                        </div>
                        <div v-else >
                            <table>
                                <tr>
                                    <th>$</th>
                                    <th>Username</th> 
                                    <th>Time</th>
                                </tr>
                                <tr v-for="bid in bids" :key="bid.dateTime">
                                    <th>{{ bid.amount }}</th>
                                    <th>{{ bid.buyerUsername }}</th>
                                    <th>{{ bid.dateString }} {{ bid.timeString }}</th>
                                </tr>    
                            </table>
                        </div>
                    </div>
                    <div id="auction-photo-wrapper-small" style="float:leftt">
                        <img class="img-responsive" v-bind:src=auction.photoLink>
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
                this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId).then(
                    function (response) {
                        this.auction = response.data;
                        this.auction['startDateString'] = new Date(this.auction.startDateTime).toDateString();
                        this.auction['endDateString'] = new Date(this.auction.endDateTime).toDateString();
                        this.bids = this.auction.bids;
                        this.bids.sort(function compare(a, b) {
                            if (a.datetime > b.datetime) {
                                return -1;
                            }
                            if (a.datetime < b.datetime) {
                                return 1;
                            }
                            return 0;
                        })
                        for (let i = 0; i < this.bids.length; i++) {
                            this.bids[i]['dateString'] = new Date(this.bids[i].datetime).toDateString();
                            this.bids[i]['timeString'] = new Date(this.bids[i].datetime).toTimeString();
                        }
                        this.seller = this.auction.seller;
                        this.auction["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + "/photos";
                    },
                    function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>
