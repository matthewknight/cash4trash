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


                <p id="demo"></p>
                <button v-if="ownsAuction && !auctionStarted" type="button" class="btn btn-success" data-toggle="modal" data-target="#editAuctionModal">Edit Auction</button>


                <br/><br/>
                <h3>Seller Username: <router-link :to="{ name: 'user', params: { userId: seller.id }}">{{ seller.username }}</router-link></h3>
                <h3>Seller ID: {{ seller.id }}</h3>
                <p>{{ auction.description }}</p>
                <div style="margin:auto">
                    <div style="float:left">
                        <h4> Bids </h4>
                        <button v-if="!ownsAuction" type="button" class="btn btn-primary" data-toggle="modal" data-target="#makeBid">Place bid</button>
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
                                    <th><router-link :to="{ name: 'user', params: { userId: bid.buyerId }}">{{ bid.buyerUsername }}</router-link></th>
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
        <!-- Create Auction Modal -->
        <div class="modal fade" id="editAuctionModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">cash4trash™ <i>Signature Edition</i> Auction</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                <td><input v-model="editAuction.title" type="text" placeholder="Title"></td>
                                </tr>
                                <tr>
                                <td>Start Date<input v-model="editAuction.startDate" type="datetime-local"></td>
                                </tr>
                                <tr>
                                <td>End Date<input v-model="editAuction.endDate" type="datetime-local"></td>
                                </tr>
                                <tr>
                                <td><input v-model="editAuction.description" type="text" placeholder="Description"></td>
                                </tr>
                                <tr>
                                <td>
                                    <select v-model.number="editAuction.categoryId">
                                        <option disabled>Auction Category</option>
                                        <option selected value=1>Apparel</option>
                                        <option value=2>Equipment</option>
                                        <option value=3>Vehicles</option>
                                        <option value=4>Property</option>
                                        <option value=5>Other</option>
                                    </select>
                                </td>
                                </tr>
                                <tr>
                                    <td><i>ĩtem</i> photo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="file" name="pic" accept="image/png, image/jpeg" @change="onFileChanged"> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button style="float: left" type="button" class="btn btn-danger" v-on:click="removePhoto">Remove Photo</button>
                        <button type="button" class="btn btn-success" v-on:click="checkEditAuction">Create</button>
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
                placedBidAmount: 0,
                auction: [],
                seller: [],
                bids: [],
                currentBestBid: [],
                ownsAuction: false,
                auctionStarted: false,

                editAuction: {
                    title: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    categoryId: 1,
                    selectedFile: null,
                }
            }
        },

        mounted: function () {
            auth.checkAuth(this, this.getAuction);
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
                            this.auctionStarted = true;
                            this.currentBestBid = this.bids[0];
                        }
                        
                        for (let i = 0; i < this.bids.length; i++) {
                            this.bids[i]['dateString'] = new Date(this.bids[i].datetime).toDateString();
                            this.bids[i]['timeString'] = new Date(this.bids[i].datetime).toTimeString();
                        }
                        this.seller = this.auction.seller;

                        console.log("seller id: " + this.seller.id + " auth'd id: " + auth.loggedInUser.id);

                        if (this.seller.id == auth.loggedInUser.id) {
                            console.log("Owns auction");
                            this.ownsAuction = true;
                        }

                        this.editAuction.title = this.auction.title;

                        let startISOdate = new Date(this.auction.startDateTime).toISOString();
                        let startConvDate = startISOdate.substring(0, startISOdate.length - 5);

                        let endISOdate = new Date(this.auction.endDateTime).toISOString();
                        let endConvDate = endISOdate.substring(0, endISOdate.length - 5);



                        this.editAuction.startDate = startConvDate;
                        this.editAuction.endDate = endConvDate;
                        this.editAuction.categoryId = this.auction.categoryId;
                        this.editAuction.description = this.auction.description;

                        this.auction["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + "/photos";
                    },
                    function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    }
                )
            },

            checkEditAuction: function () {
                console.log("Auctions: checking validity of new auction")
                this.editAuction['startDateUnix'] = new Date(this.editAuction.startDateTime).getTime();
                this.editAuction['endDateUnix'] = new Date(this.editAuction.endDateTime).getTime();

                // Check auction title
                if (this.editAuction.title == '' || this.editAuction.title == null) {
                    alert('Please enter an auction title');
                    return;
                }

                // Check auction description
                if (this.editAuction.description == '' || this.editAuction.description == null) {
                    alert('Please enter an auction description');
                    return;
                }

                if (this.editAuction.startDate == '' || this.editAuction.startDate == null) {
                    alert('Please enter an auction start date');
                    return;
                } else if (this.editAuction.startDateUnix < new Date(Date.now())) {
                    alert('Start datetime is before now');
                    return;
                } else if (this.editAuction.startDateUnix >= this.editAuction.endDateUnix) {
                    alert('Auction start date is after end date');
                    return;
                }

                console.log("Auctions: new auction valid");
                this.pushEditAuction();
            },

            pushEditAuction: function () {
                console.log("Posting edit auction...");

                let auctionData = {
                        'categoryId': this.editAuction.categoryId,
                        'title': this.editAuction.title,
                        'description': this.editAuction.description,
                        'startDateTime': new Date(this.editAuction.startDate).getTime(),
                        'endDateTime': new Date(this.editAuction.endDate).getTime(),
                        'reservePrice': 100,
                        'startingBid': 10
                    }
                this.$http.patch(
                    'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId, 
                    auctionData, {headers: auth.getAuthHeaderSetJSON()}
                ).then(response => {
                    // get body data
                    alert("Successfully updated auction");
                    this.uploadPhoto();
                }, error => {
                    // error callback
                    alert("Failed to create auction");
                    console.log(error);
                });
            },

            uploadPhoto(done = function () {}) {
                if (this.editAuction.selectedFile == null) {
                    location.reload();
                    return;
                }
                console.log("UPLOADING NEW PHOTO... of type " + this.editAuction.selectedFile.type)
                let headerConfig = {}
                if (this.editAuction.selectedFile.type === 'image/png') {
                    headerConfig = { headers: auth.getAuthHeaderSetPNG() }
                } else if (this.editAuction.selectedFile.type === 'image/jpeg') {
                    headerConfig = { headers: auth.getAuthHeaderSetJPEG() }
                } else {
                    alert("Failed to upload photo, invalid format");
                    return;
                }

                this.$http.post(
                    'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/photos',
                    this.editAuction.selectedFile, headerConfig).then(response => {
                    // get body data
                    console.log("added photo")
                    location.reload();
                    done();
                }, error => {
                    // error callback
                    console.log("error adding photo: " + error);
                });
            },

            onFileChanged (event) {
                this.editAuction.selectedFile = event.target.files[0];
            },

            removePhoto: function () {
                console.log("Remove photo called");
                let headerConfig = { headers: auth.getAuthHeader() }
                this.$http.delete(
                    'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/photos', headerConfig)
                .then(response => { 
                    // get body data
                    console.log("Deleted photo")
                    location.reload();
                    done();
                }, error => {
                    if (error.status === 500) {
                        alert("No photo to delete");
                    } else {
                        console.log(error);
                    }
                });         

            },

            checkBid: function () {
                if (this.placedBidAmount <= this.currentBestBid.amount) {
                    alert("Bid is lower than current best bid");
                    return;
                }

                if (this.auction.startDateTime > new Date(Date.now())) {
                    alert("Auction has yet to start");
                    return;
                } else if (this.auction.endDateTime < new Date(Date.now())) {
                    alert("Auction has already ended");
                    return
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
