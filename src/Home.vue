<template>
    <div id="app">
        <div id="content-wrapper">
            <img src="./assets/home.png">
            <br/><br/>
            <h1><router-link :to="{ name: 'auctions' }"><i>Treasures await!</i></router-link></h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
