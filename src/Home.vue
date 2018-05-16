<template>
    <div id="app">
        <img src="./assets/home.png">
        <br/><br/>
        <h1><router-link :to="{ name: 'auctions' }"><i>Treasures await!</i></router-link></h1>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
