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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#makeBid">Place bid</button>
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

                        <!-- Bid Modal -->
                        <div class="modal fade" id="makeBid">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">

                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">Bid on {{ auction.title }}</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        Minimum bid: $
                                        <input style="width: 70px" v-model="placedBidAmount" type="number" v-bind:placeholder="currentBestBid.amount + 1"> 
                                    </div>

                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" v-on:click="checkBid">Place bid</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="auction-photo-wrapper-small" style="float:leftt">
                        <img v-bind:src=auction.photoLink>
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
                placedBidAmount: 0,
                auction: [],
                seller: [],
                bids: [],
                currentBestBid: []
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
                        if (this.bids.length === 0) {
                            this.currentBestBid.amount = 0;
                        } else {
                            this.currentBestBid = this.bids[0];
                        }
                        
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
            },

            checkBid: function () {
                if (this.placedBidAmount <= this.currentBestBid.amount) {
                    alert("Bid is lower than current best bid");
                    return;
                }
                this.placeBid();
            },

            placeBid: function () {
                console.log("Auction: authheader: " + auth.getAuthHeader()['X-Authorization']);
                this.$http.post('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids', [], { params: { id: this.$route.params.auctionId, 
                                                                                                                                amount: this.placedBidAmount },
                                                                                                                    headers: auth.getAuthHeader() })
                                                                                                                                .then(
                    function (response) {
                        $('#makeBid').modal('hide');
                        alert("Successfully placed bid!")
                        this.getAuction();
                    },
                    function (error) {
                        alert("Failed to place bid");
                        console.log(error);
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>
