import Vue from "vue";
import App from "./App.vue";
import Home from "./Home.vue";
import Auctions from "./Auctions.vue";
import Auction from "./Auction.vue";
import MyAuctions from "./MyAuctions.vue";
import MyBids from "./MyBids.vue";
import User from "./User.vue";

import VueRouter from "vue-router";
import VueResource from "vue-resource";

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/trash",
        name: "auctions",
        component: Auctions
    },
    {
        path: "/trash4sale/:auctionId",
        name: "auction",
        component: Auction
    },
    {
        path: "/mytrash",
        name: "myauctions",
        component: MyAuctions
    },
    {
        path: "/trashinwhichihavepromisedmoneyfor",
        name: "myauctionsbids",
        component: MyBids
    },
    {
        path: "/trashtrader/:userId",
        name: "user",
        component: User
    }
];

const router = new VueRouter({
    routes: routes,
    mode: "history"
});

export {router};

new Vue({
    el: "#app",
    router: router,
    render: h => h(App)
});
