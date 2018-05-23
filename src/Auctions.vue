<template>
    <div id="content-wrapper">
        <!-- Error Section -->
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div>
            <!-- Banner -->
            <img src="./assets/auctionBanner.png">
            <br/>

            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Search</th>
                    <th scope="col">Auction Type</th>
                    <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <input v-model="auctionSearchString" placeholder="Search...">
                    </td>
                    <td>
                        <select v-model="auctionType" v-on:change="getAuctions">
                            <option disabled>Auction Type</option>
                            <option selected value="all">All</option>
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                            <option value="won">Won</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </td>
                    <td>
                        <select v-model="auctionCategoryId" v-on:change="getAuctions">
                            <option disabled>Auction Category</option>
                            <option selected value="">All</option>
                            <option value="1">Apparel</option>
                            <option value="2">Equipment</option>
                            <option value="3">Vehicles</option>
                            <option value="4">Property</option>
                            <option value="5">Other</option>
                        </select>
                    </td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Search field
            <button type="button" v-on:click=getAuctions>Search</button> -->

            <!-- Auction type combo box -->
            

            <!-- Auction category combo box -->
            <button type="button" class="btn btn-primary" v-on:click="checkOpenCreateAuctionModal">
                Create Auction
            </button>

            <!-- Create Auction Modal -->
            <div class="modal fade" id="createAuction">
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
                                    <td><input v-model="createAuction.title" type="text" placeholder="Title"></td>
                                    </tr>
                                    <tr>
                                    <td>Start Date<input v-model="createAuction.startDate" type="datetime-local"></td>
                                    </tr>
                                    <tr>
                                    <td>End Date<input v-model="createAuction.endDate" type="datetime-local"></td>
                                    </tr>
                                    <tr>
                                    <td><input v-model="createAuction.description" type="text" placeholder="Description"></td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <select v-model.number="createAuction.categoryId">
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
                                    <td>Reserve Price $<input v-model="createAuction.reservePrice" type="number"></td>
                                    </tr>
                                    <tr>
                                    <td>Starting Bid $<input v-model="createAuction.startingBid" type="number"></td>
                                    </tr>
                                    <tr>
                                        <td><i>ĩtem</i> photo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="file" name="pic" accept="image/png, image/jpeg" @change="onFileChanged"> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" v-on:click="checkCreateAuction">Create</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

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
                auctions: [],
                auctionType: "all",
                auctionSearchString: "",
                auctionCategoryId: "",

                createAuction: {
                    title: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    categoryId: 1,
                    reservePrice: 0,
                    startingBid: 0,
                    selectedFile: null,
                }
            }
        },

        mounted: function () {
            this.getAuctions();
        },

        watch: {
            auctionSearchString: function () {
                this.getAuctions();
            }
        },

        methods: {
            getAuctions: function () {
                window.open("https://zapatopi.net/afdb/");
                console.log("Calling getAuctions... with type " + this.auctionType);

                let params = { "status" : this.auctionType }
                
                // Check if auction search string provided
                if (this.auctionSearchString !== "") {
                    params["q"] = this.auctionSearchString;
                }

                // Check if auction category provided
                if (this.auctionCategoryId !== "") {
                    params["category-id"] = this.auctionCategoryId;
                }
                
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

            checkOpenCreateAuctionModal: function () {
                auth.checkAuth(this);
                if (!auth.user.authenticated) {
                    alert("Please login/register to create an auction");
                } else {
                    $('#createAuction').modal('show');
                }
            },

            checkCreateAuction: function () {
                console.log("Auctions: checking validity of new auction")
                this.createAuction['startDateUnix'] = new Date(this.createAuction.startDate).getTime();
                this.createAuction['endDateUnix'] = new Date(this.createAuction.endDate).getTime();

                // Check auction title
                if (this.createAuction.title == '' || this.createAuction.title == null) {
                    alert('Please enter an auction title');
                    return;
                }

                // Check auction description
                if (this.createAuction.description == '' || this.createAuction.description == null) {
                    alert('Please enter an auction description');
                    return;
                }

                if (this.createAuction.startDate == '' || this.createAuction.startDate == null) {
                    alert('Please enter an auction start date');
                    return;
                } else if (this.createAuction.startDateUnix < new Date(Date.now())) {
                    alert('Start datetime is before now');
                    return;
                } else if (this.createAuction.startDateUnix >= this.createAuction.endDateUnix) {
                    alert('Auction start date is after end date');
                    return;
                }

                if (this.createAuction.reservePrice < 1) {
                    alert('Reserve price too low');
                    this.createAuction.reservePrice = 1;
                    return;
                }

                if (this.createAuction.startingBid < 1) {
                    alert('Starting bid too low');
                    this.createAuction.startingBid = 1;
                    return;
                }
                console.log("Auctions: new auction valid");
                this.submitNewAuction();
            },

            submitNewAuction: function () {
                let auctionData = {
                        'categoryId': this.createAuction.categoryId,
                        'title': this.createAuction.title,
                        'description': this.createAuction.description,
                        'startDateTime': new Date(this.createAuction.startDate).getTime(),
                        'endDateTime': new Date(this.createAuction.endDate).getTime(),
                        'reservePrice': this.createAuction.reservePrice,
                        'startingBid': this.createAuction.startingBid
                    }
                console.log("Auctions: submitting new auction");
                this.$http.post(
                    'http://localhost:4941/api/v1/auctions', 
                    auctionData, {headers: auth.getAuthHeaderSetJSON()}
                ).then(response => {
                    // get body data
                    alert("Successfully created auction");
                    this.getAuctions();
                    this.uploadPhoto(response.data.id);
                    console.log("GOT ID FROM RESPONSE: " + response.data.id );
                }, error => {
                    // error callback
                    alert("Failed to create auction");
                    console.log(error);
                });
                
            },
            
            uploadPhoto(id) {
                if (this.createAuction.selectedFile == null) {
                    return;
                }
                console.log("UPLOADING NEW PHOTO... of type " + this.createAuction.selectedFile.type)
                let headerConfig = {}
                if (this.createAuction.selectedFile.type === 'image/png') {
                    headerConfig = { headers: auth.getAuthHeaderSetPNG() }
                } else if (this.createAuction.selectedFile.type === 'image/jpeg') {
                    headerConfig = { headers: auth.getAuthHeaderSetJPEG() }
                } else {
                    alert("Failed to upload photo, invalid format");
                    return;
                }

                this.$http.post(
                    'http://localhost:4941/api/v1/auctions/' + id + '/photos',
                    this.createAuction.selectedFile, headerConfig).then(response => {
                    // get body data
                    console.log("added photo")
                    location.reload();
                }, error => {
                    // error callback
                    console.log("error adding photo: " + error);
                });
            },

            onFileChanged (event) {
                this.createAuction.selectedFile = event.target.files[0];
            }
        }
    }
</script>

<style scoped>

</style>
