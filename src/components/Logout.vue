<template>
    <div class="logout">
        <button type="button" class="logout-button" @click="signOut">
            <img src="../assets/logout.svg" alt="logout" width="24" />
        </button>
    </div>
</template>

<script>
import firebase from 'firebase/compat';
import { useRouter } from 'vue-router';
export default {
    name: 'Logout',
    setup() {
        const router = useRouter();
        const signOut = () => {
            firebase.auth().signOut();
            router.push('/login');
        };
        return { signOut };
    },
};
</script>

<style>
.logout {
    margin-left: auto;
    margin-bottom: 20px;
}
.logout-button {
    cursor: pointer;
    padding: 10px;
    width: 80px;
    border-radius: 10px;
    background-color: rgb(218, 218, 218);
    border-color: #636262;
    border-style: solid;
    color: white;
}
.logout-button:hover {
    cursor: pointer;
    padding: 10px;
    width: 80px;
    border-radius: 10px;
    margin-left: auto;
    background-color: rgb(190, 188, 188);
    border-color: #424242;
    border-style: solid;
    color: white;
}
</style>
