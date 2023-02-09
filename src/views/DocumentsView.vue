<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
                <thead>
                    <th >
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/newDocument'">
                                <span class="material-icons-two-tone">
                                    add
                                    </span>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/'">
                                <span class="material-icons-two-tone">
                                    logout
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
                <thead class="fondo1"><tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Proyecto</th>
                    <th>Estado</th>
                    <th>Categoría</th>
                    <th>Asignación</th>
                    <th>Tiempo OCR</th>
                    <th>Revisado</th>
                    <th>Acción</th></tr></thead>
                <tbody class="table-group-divider" id="Contenido">
                    <tr v-for="doc, i in documents" :key="doc.id">
                        <td>{{ (i+1) }}</td>
                        <td>{{ doc.data_file_name }}</td>
                        <td>{{ doc.project }}</td>
                        <td>{{ doc.status_data }}</td>
                        <td>{{ doc.category }}</td>
                        <td>{{ doc.assignee }}</td>
                        <td>{{ doc.ocr_time }}</td>
                        <td>{{ doc.is_reviewed }}</td>
                        <td>
                            <button class="btn btn-danger" v-on:click="eliminarDoc(doc.id)">
                                <span class="material-icons-two-tone">
                                    delete
                                    </span>
                            </button>
                            <button @click="() => TogglePopup('buttonTrigger')" class="btn btn-info">
                                <span class="material-icons-two-tone">
                                info
                                </span></button>
                            
        
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <Popup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
                <table class="table table-bordered table-hover">
                    <thead class="fondo1"><tr><th>#</th><th>Nombre</th><th>Proyecto</th><th>Categoría</th><th>Asignación</th></tr></thead>
                    <tbody class="table-group-divider" id="Contenido">
                        <tr v-for="inf, i in info" :key="inf.id">
                            <td>{{ (i+1) }}</td>
                            <td>{{ inf.data_file_name }}</td>
                            <td>{{ inf.project }}</td>
                            <td>{{ inf.ocr_time }}</td>
                            <td>{{ inf.text }}</td> 
                        </tr>
                    </tbody>
                </table>
            </Popup> -->
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import Popup from '../components/PopupNav.vue';

export default{

    setup () {
		const popupTriggers = ref({
			buttonTrigger: false
		});
		const TogglePopup = (trigger) => {
			popupTriggers.value[trigger] = !popupTriggers.value[trigger]
		}
		
		return {
			Popup,
			popupTriggers,
			TogglePopup
		}
	},
    
    data(){
        return{ documents:null, info:null }
    },
    mounted(){
        this.getDocuments();
    },
    methods:{

        getDocuments(){
            axios.post('https://app.konfuzio.com/api/v3/auth/', new URLSearchParams({
            'username': 'dsanzh00@estudiantes.unileon.es',
            'password': 'tfg12345'}))
            .then(
                result => {
                    console.log(result.data);
                    console.log(result.data.token);
                    if(result.status === 200){
                        axios.get('https://app.konfuzio.com/api/v3/documents/', {
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
                                this.documents = response.data.results;
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

        getInfoDoc(id){
            
            axios.get('https://app.konfuzio.com/api/v3/documents/'+id+'/', {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Basic ZHNhbnpoMDBAZXN0dWRpYW50ZXMudW5pbGVvbi5lczp0ZmcxMjM0NQ=='
                }
                }).then(
                    result => {
                        console.log(result.status)
                        this.info = result.data.results;
                    }
                );
        }

    }
}
</script>

<style scoped>
.fondo1 {
    color: beige;
    background-image: url('../assets/img/fondo1.jpg');
}

</style>