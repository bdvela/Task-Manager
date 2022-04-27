<template>
    <LoginRegister title="Inicia Sesión" />
    <p>¿No tienes una cuenta? <router-link to="./Register">Regístrate aquí</router-link></p>
</template>

<script>
import LoginRegister from '../components/LoginRegister.vue';
export default {
    name: 'Login',
    components: { LoginRegister },
};
</script>

<style></style>
