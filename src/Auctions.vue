<template>
    <div>
        <!-- Error Section -->
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.auctionId">
            <!-- Banner -->
            <img src="./assets/singleAuctionBanner.png">

            <!-- Single auction view -->
            <div id="auction">
                <router-link :to="{ name: 'auctions'}">Back to Auctions</router-link>
                <h1>{{ getSingleAuction($route.params.auctionId).title }}</h1>
                <h2>{{ getSingleAuction($route.params.auctionId).id }}</h2>
                <img v-bind:src=getSingleAuction($route.params.auctionId).photoLink border="5">
            </div>
        </div>
        <div v-else>
            <!-- Banner -->
            <img src="./assets/auctionBanner.png">
            <br/>

            <input v-model="auctionSearchString" type="text" placeholder="Search..">
            <button type="button" v-on:click=getAuctions>Search</button>

            <!-- Auction type combo box -->
            <select v-model="auctionType" v-on:change="getAuctions">
                <option disabled>Auction Type</option>
                <option selected value="all">All</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="won">Won</option>
                <option value="upcoming">Upcoming</option>
            </select>
            <span>Selected: {{ auctionType }} Count: {{ auctions.length }} SearchStr: {{ auctionSearchString }}</span>

            <!-- All auctions table -->
            <div id="auctions">
                <div v-for="auction in auctions" :key="auction.id">
                    <h1><router-link :to="{ name: 'auction', params: { auctionId: auction.id }}">{{ auction.title }}</router-link></h1>
                    <h2>{{ auction.id }}</h2>
                    <img v-bind:src=auction.photoLink border="5">
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
                auctionSearchString: ""
            }
        },

        mounted: function () {
            this.getAuctions();
        },

        methods: {
            getAuctions: function () {
                console.log("Calling getAuctions... with type " + this.auctionType);

                let params;
                if (this.auctionSearchString === "") {
                    params = { "status" : this.auctionType }
                } else {
                    params = { "status" : this.auctionType,
                                    "q" : this.auctionSearchString}
                }
                this.$http.get('http://localhost:4941/api/v1/auctions', {params: params}).then(
                    function (response) {
                        console.log(response.body);
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
                for (let i = 0; i <= this.auctions.length; i++) {
                    this.auctions[i]["photoLink"] = 'http://localhost:4941/api/v1/auctions/' + this.auctions[i].id + "/photos";
                }
            }
        }
    }
</script>

<style scoped>

</style>
