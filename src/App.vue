<template>

    <div id="app">
        <topnavbar/>
        <router-view></router-view>
    </div>
</template>

<script>
    import TopnavbarVue from './Topnavbar.vue';
    export default {
        components: {
            topnavbar: TopnavbarVue
        }
    }
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#auction-photo-wrapper {
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
}

#auction-photo-wrapper-small {
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

</style>
