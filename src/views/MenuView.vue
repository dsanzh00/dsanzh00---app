<template>
    <div class="Menu">
        <div class="row mx-0">
            <div class="col-lg-mx">
                <table class="table table-bordered table-hover">
                    <thead>
                        <th >
                            <td>
                                <button class="btn btn-danger" onclick="location.href='http://localhost:8080/'">
                                    <span class="material-icons-two-tone">
                                        logout
                                        </span>
                                </button>
                            </td>
                        </th>
                    </thead>
                </table>
                <card-comp class="mt-5 fondo1">
                    <div class="row-lg-6">
                        <h2>Proyectos</h2>
                    </div>
                    <div class="row-lg-6">
                        <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/projects'">
                            <span class="material-icons-two-tone">
                                open_in_full
                                </span>
                        </button>
                    </div>
                </card-comp>
                <card-comp class="mt-5 fondo1">
                    <div class="row-lg-6">
                        <h2>Documentos</h2>
                    </div>
                    <div class="btn-lg-mx">
                        <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/documents'">
                            <span class="material-icons-two-tone">
                                open_in_full
                                </span>
                        </button>
                    </div>
                </card-comp>
                <card-comp class="mt-5 fondo1">
                    <div class="row-lg-6">
                        <h2>Categorías</h2>
                    </div>
                    <div class="btn-lg-mx">
                        <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/categories'">
                            <span class="material-icons-two-tone">
                                open_in_full
                                </span>
                        </button>
                    </div>
                </card-comp>
                <card-comp class="mt-5 fondo1">
                    <div class="row-lg-6">
                        <h2>Etiquetas</h2>
                    </div>
                    <div class="btn-lg-mx">
                        <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/labels'">
                            <span class="material-icons-two-tone">
                                open_in_full
                                </span>
                        </button>
                    </div>
                </card-comp>
            </div>
          </div>

    </div>
      
  </template>

<script>

import CardComp from "../components/CardComp.vue"
export default {
  name: 'MenuView',
  components: {
    CardComp
  }
}


</script>

<style scoped>
h2{
    color: azure;
    text-align: center;
}

.btn {
    align-content: right;
}

.fondo1 {
    background-image: url('../assets/img/fondo1.jpg');
}


</style>