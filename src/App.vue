<template>
    <div id="nav"></div>
    <router-view />
</template>
<script setup>
import { ref } from 'vue';
import firebase from 'firebase/compat';
const isLoggedIn = ref(true);
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        isLoggedIn.value = true; // if we have a user
    } else {
        isLoggedIn.value = false; // if we do not
    }
});
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
span {
    color: #6ec3b4;
}
</style>
