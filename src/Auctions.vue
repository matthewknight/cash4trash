<template>
    <div>
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
                    <td><input v-model="auctionSearchString" type="text" placeholder="Search.." v-on:oninput="getAuctions"></td>
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
            
            <!-- Search field -->
            <button type="button" v-on:click=getAuctions>Search</button>

            <!-- Auction type combo box -->
            

            <!-- Auction category combo box -->
            <br/><br/>
            <span>Selected: {{ auctionType }} Count: {{ auctions.length }} SearchStr: {{ auctionSearchString }}</span>
            <br/><br/>
            <!-- All auctions table -->
            <div id="auctions">
                <div v-for="auction in auctions" :key="auction.id">
                    <h1><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}">{{ auction.title }}</router-link></h1>
                    <h2>{{ auction.id }}</h2>
                    <div id="auction-photo-wrapper">
                        <img class="img-thumbnail" v-bind:src=auction.photoLink border="5">
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
                auctions: [],
                auctionType: "all",
                auctionSearchString: "",
                auctionCategoryId: "",
            }
        },

        mounted: function () {
            this.getAuctions();
        },

        methods: {
            getAuctions: function () {
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
            getSingleAuction: function (id) {
                for (let i =  0; i < this.auctions.length; i++) {
                    if (this.auctions[i].id == id) {
                        return this.auctions[i];
                    }
                }
            },
            getPhotos: function () {
                for (let i = 0; i < this.auctions.length; i++) {
                    this.auctions[i]["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.auctions[i].id + "/photos";
                }
            }
        }
    }
</script>

<style scoped>

</style>
