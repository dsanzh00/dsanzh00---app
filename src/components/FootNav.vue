<template>
  <footer class="mt-5">
    <ul class="list-group list-group-flush list-group-horizontal text-center mb-0">
        
        <li class="list-group-item">
            <router-link class="router-link" to="/">Home</router-link>
        </li>
        <li class="list-group-item">
            <router-link class="router-link" to="/about">About</router-link>
        </li>
        <!-- <li class="list-group-item">
            <router-link class="router-link" to="/documents">Documents</router-link>
        </li> -->
        
    </ul>
    <img src="../assets/img/escudo-txtderecha.jpg" alt="logo uni" />
    <div class="text-black-50 text-center">Dr Writing &#169; 2023</div>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
    footer {
        width: 100%;
    }

    img {
        max-width: 300px;
        margin: 0 auto;
        display: block;
    }

    .text-center {
        margin-top: -0.5em;
        margin-botom: 0.5em;
    }

    .list-group {
        justify-content: center;
    }

    .list-group-item {
        border: none;
    }

    .router-link {
        text-decoration: none;
    }

    @media (min-width: 768px) {
        footer {
            position: absolute;
        }
    }
</style>