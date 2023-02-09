<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
                <thead>
                    <th >
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/newLabel'">
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
                <thead class="fondo1"><tr><th>#</th><th>Nombre</th><th>Proyecto</th><th>Creador</th><th>Descripción</th><th>Acción</th></tr></thead>
                <tbody class="table-group-divider" id="Contenido">
                    <tr v-for="lab, i in labels" :key="lab.id">
                        <td>{{ (i+1) }}</td>
                        <td>{{ lab.name }}</td>
                        <td>{{ lab.project }}</td>
                        <td>Daniel Sanz</td>
                        <td>{{ lab.description }}</td> 
                        <td>
                            <button class="btn btn-danger" v-on:click="eliminarLab(lab.id)">
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
        return{ labels:null}
    },
    mounted(){
        this.getLabels();
    },
    methods:{

        getLabels(){
            axios.post('https://app.konfuzio.com/api/v3/auth/', new URLSearchParams({
            'username': 'dsanzh00@estudiantes.unileon.es',
            'password': 'tfg12345'}))
            .then(
                result => {
                    console.log(result.data);
                    console.log(result.data.token);
                    if(result.status === 200){
                        axios.get('https://app.konfuzio.com/api/v3/labels/', {
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
                                this.labels = response.data.results;
                            });
                    }
                }

                
            );

            
        },

        eliminarLab(id){
            axios.delete('https://app.konfuzio.com/api/v3/labels/'+id+'/', {
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