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
    background: url('assets/landfill.jpg');
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#content-wrapper {
    background: white;
    width: 70%;
    margin: 0 auto;
    padding: 5px;
}

#topnav {
    margin: 0 auto;
    background:
    url('https://media.giphy.com/media/VTxmwaCEwSlZm/200w_d.gif');
    padding: 5px;
    vertical-align: middle;
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

img {
    max-width: 100%;
    height: auto;
}



.modal {
  overflow-y: hidden; 
}
.modal-open .modal {
  overflow-y: scroll;      
}

.modal-open .modal-shiftfix,
.modal-open .modal-shiftfix .navbar-fixed-top,
.modal-open .modal-shiftfix .navbar-fixed-bottom {
  overflow-y: scroll;      
}

img:hover {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-2px, 0px) rotate(1deg); }
    30% { transform: translate(2px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-2px, 1px) rotate(0deg); }
    70% { transform: translate(2px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}

@keyframes slightlyspin {
    0% { transform: rotate(0deg); }
    10% { transform: rotate(-0.1deg); }
    20% { transform: rotate(-0.1deg); }
    30% { transform: rotate(-0.1deg); }
    40% { transform: rotate(-0.1deg); }
    50% { transform: rotate(-0.1deg); }
    60% { transform: rotate(0.1deg); }
    70% { transform: rotate(0.1deg); }
    80% { transform: rotate(0.1deg); }
    90% { transform: rotate(0.1deg); }
    100% { transform: rotate(0.1deg); }
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
