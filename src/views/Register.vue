<template>
    <LoginRegister title="Crea una Cuenta" />
    <p>Ya tengo una cuenta. <router-link to="./Login">Iniciar Sesión</router-link></p>
</template>

//
<script>
import LoginRegister from '../components/LoginRegister.vue';
export default {
    name: 'Register',
    components: { LoginRegister },
};
</script>

<style scoped></style>
