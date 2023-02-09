<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/newProject'">
                                <span class="material-icons-two-tone">
                                    add
                                    </span>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/menu'">
                                <span class="material-icons-two-tone">
                                    arrow_back
                                    </span>
                            </button>
                        </td>
                    </th>
                </thead>
            </table>
        </div>
    </div>
  <div class="row">
    <div class="col">
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="fondo1"><tr><th>#</th><th>Nombre</th><th> ID Proyecto</th><th>Creador</th><th>Días para eliminación</th><th>Acción</th></tr></thead>
                <tbody class="table-group-divider" id="Contenido">
                    <tr v-for="proj, i in projects" :key="proj.id">
                        <td>{{ (i+1) }}</td>
                         <td>{{ proj.name }}</td>
                        <td>{{ proj.id }}</td>
                        <td>Daniel Sanz</td>
                        <td>{{ proj.auto_delete_documents_after_days }}</td> 
                        <td>
                            <button class="btn btn-danger" v-on:click="eliminarDoc(proj.id)">
                                <span class="material-icons-two-tone">
                                    delete
                                    </span>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{

    
    
    data(){
        return{ projects:null}
    },
    mounted(){
        this.getProjects();
    },
    methods:{

        getProjects(){
            axios.post('https://app.konfuzio.com/api/v3/auth/', new URLSearchParams({
            'username': 'dsanzh00@estudiantes.unileon.es',
            'password': 'tfg12345'}))
            .then(
                result => {
                    console.log(result.data);
                    console.log(result.data.token);
                    if(result.status === 200){
                        axios.get('https://app.konfuzio.com/api/v3/projects/', {
                            params: {
                                'limit': '80',
                                
                            },
                            headers: {
                                'accept': 'application/json',
                                'Authorization': 'Basic ZHNhbnpoMDBAZXN0dWRpYW50ZXMudW5pbGVvbi5lczp0ZmcxMjM0NQ=='
                            }
                            }).then(
                            response => {
                                console.log(response.data.results)
                                this.projects = response.data.results;
                            });
                    }
                }

                
            );

            
        },

        eliminarDoc(id){
            
            axios.delete('https://app.konfuzio.com/api/v3/documents/'+id+'/', {
                headers: {
                    'accept': '*/*',
                   'Authorization': 'Basic ZHNhbnpoMDBAZXN0dWRpYW50ZXMudW5pbGVvbi5lczp0ZmcxMjM0NQ==',
                    'X-CSRFTOKEN': 'dsLcDkJ4VmfCboSGKnceqqZaNuK7DDr7SIY2Ah44kCTkXrHxgu0QbooYC0M1ytc4'
                }
            }).then(
                result => {
                    console.log(result.status)
                }
            );

            setTimeout(() => {document.location.reload(true);}, 500)
        },

    }
}
</script>

<style scoped>
.fondo1 {
    color: beige;
    background-image: url('../assets/img/fondo1.jpg');
}

</style>