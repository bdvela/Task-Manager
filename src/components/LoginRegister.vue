<template>
    <div class="header">
        <h1><span>Task Manager</span></h1>
        <Logout />
    </div>
    <div class="card">
        <h1>{{ title }}</h1>
        <form class="register-card" @submit.prevent="login" v-if="title == 'Inicia Sesión'">
            <input type="text" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Contraseña" v-model="password" />
            <button type="button" @click="login">Iniciar Sesión</button>
            <hr />
            <button type="button" @click="googleSignIn" class="google">
                <img src="../assets/google.svg" alt="google" width="35" class="googleicon" />
                <p class="continuar">Continuar con Google</p>
            </button>
        </form>
        <form class="register-card" @submit.prevent="register" v-else>
            <input type="text" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Contraseña" v-model="password" />
            <button type="button" @click="register">Registrarme</button>
            <hr />
            <button type="button" @click="googleSignIn" class="google">
                <img src="../assets/google.svg" alt="google" width="35" class="googleicon" />
                <p class="continuar">Continuar con Google</p>
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase/compat';
import { useRouter } from 'vue-router';
let db = firebase.database();
let usersRef = db.ref('users');
export default {
    name: 'LoginRegister',
    props: ['title'],
    firebase: {
        users: usersRef,
    },
    setup() {
        const email = ref('');
        const password = ref('');
        const errMsg = ref('');
        const router = useRouter();
        const register = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(data => {
                    let user = {};
                    user = { email: email.value, password: password.value, tasks: {} };
                    console.log('Registrado Satisfactoriamente');
                    console.log(data);
                    alert('Registrado Satisfactoriamente');
                    usersRef.push(user);
                    router.push('/');
                })
                .catch(error => {
                    console.log(error.code);
                    alert(email.value);
                    alert(error.message);
                });
        };
        const login = () => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                .then(data => {
                    console.log('LOGGEADO SATISFACTORIAMENTE');
                    console.log(data);
                    router.push('/');
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            errMsg.value = 'Email Inválido';
                            break;
                        case 'auth/user-not-found':
                            errMsg.value = 'No se encontró ninguna cuenta con ese email';
                            break;
                        case 'auth/wrong-password':
                            errMsg.value = 'Contraseña incorrecta';
                            break;
                        default:
                            errMsg.value = 'Email o contraseña incorrecto';
                            break;
                    }

                    alert(errMsg.value);
                });
        };
        const googleSignIn = () => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    let token = result.credential.accessToken;
                    let user = result.user;
                    console.log(token);
                    console.log(user);

                    router.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
        };
        return { email, password, register, login, googleSignIn };
    },
};
</script>

<style>
.card {
    margin-left: auto;
    margin-right: auto;
    width: 50vh;
    border-color: #e4e4e4;
    border-style: solid;
    border-radius: 6px;
    border-radius: 16px;
    padding: 2%;
}
.card:hover {
    border-color: #dadada;
    box-shadow: 0 0 10px 5px #bdbdbd44;
}
.register-card {
    margin-top: 40px;
}
.register-card input {
    width: 100%;
    margin-bottom: 20px;
    height: 40px;
    border-color: #c5c5c5;
    border-style: solid;
    border-radius: 6px;
    font-size: 18px;
}
.register-card input:hover {
    border-color: #727272;
}
.register-card button {
    width: 100%;
    height: 45px;
    background-color: #8eeddc;
    border-color: #6ec3b4;
    border-style: solid;
    border-radius: 6px;

    font-size: 18px;
}
.register-card button:hover {
    width: 100%;
    height: 45px;
    background-color: #7dc9bb;
    border-color: #0b947b;
    border-style: solid;
    border-radius: 6px;
}
.google {
    justify-content: center;
    text-align: center;
    align-items: center;
    display: flex;
    background-color: #4285f4 !important;
    border-color: #4285f4 !important;
    color: white;
}
.google:hover {
    background-color: #2061ca !important;
    border-color: #4285f4 !important;
}
.googleicon {
    background-color: #fff;
}
.continuar {
    margin: 20px;
}
</style>
