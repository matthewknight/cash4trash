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
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createAuction">
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
                                    <td>Start Date<input v-model="createAuction.startDate" type="date"></td>
                                    </tr>
                                    <tr>
                                    <td>End Date<input v-model="createAuction.endDate" type="date"></td>
                                    </tr>
                                    <tr>
                                    <td><input v-model="createAuction.description" type="text" placeholder="Description"></td>
                                    </tr>
                                    <tr>
                                    <td><input v-model="createAuction.categoryId" type="number" placeholder="Category ID"></td>
                                    </tr>
                                    <tr>
                                        <td> <input type="file" name="pic" accept="image/*" @change="onFileChanged"> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" v-on:click="checkCreateAuction">Register</button>
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
                    categoryId: 0,
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
                window.open("http://www.jamilin.com/");
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

            checkCreateAuction: function () {
                console.log("Auctions: checking validity of new auction")
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
                }

                if (this.createAuction.categoryId == '' || this.createAuction.categoryId == null) {
                    alert('Please enter an auction start date');
                    return;
                }
                console.log("Auctions: new auction valid");
                this.submitNewAuction();
            },

            submitNewAuction: function () {
                let auctionData = {
                        'categoryId': 2,
                        'title': this.createAuction.title,
                        'description': this.createAuction.description,
                        'startDateTime': new Date(this.createAuction.startDate).getTime(),
                        'endDateTime': new Date(this.createAuction.startDate).getTime(),
                        'reservePrice': 100,
                        'startingBid': 10
                    }
                console.log("Auctions: submitting new auction");
                this.$http.post(
                    'http://localhost:4941/api/v1/auctions', 
                    auctionData, { 
                                   emulateJSON: true, headers: auth.getAuthHeader() }
                ).then(response => {
                    // get body data
                    alert("Successfully created auction");
                    this.getAuctions();
                }, error => {
                    // error callback
                    alert("Failed to create auction");
                    console.log(error);
                });
                
            },
            
            uploadPhoto() {
            // upload file, get it from this.selectedFile
                this.$http.post(
                    'http://localhost:4941/api/v1/auctions/6/photos', 
                    this.createAuction.selectedFile, 
                    {
                    headers: {
                        "X-Authorization": "token",
                        "Content-Type": "image/jpeg"
                    }
                }).then(response => {
                    // get body data
                    console.log("success")
                }, response => {
                    // error callback
                    console.log("error")
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
