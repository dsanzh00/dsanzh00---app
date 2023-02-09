<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/labels'">
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
            <div class="card mt-4 col-lg-6">
                <form v-on:submit="addLabel()">
                    <div class="mb-3 mt-2 ">
                      <input 
                      type="text" 
                      class="form-control"
                      id="id"
                      name="name" 
                      placeholder="Nombre"
                      v-model="name">              
                    </div>
                    <div class="mb-3 mt-2 ">
                        <input 
                        type="text" 
                        class="form-control"
                        id="id"
                        name="api_name" 
                        placeholder="Api Nombre"
                        v-model="api_name">              
                      </div>
                    <div class="mb-3 mt-2 ">
                        <input 
                        type="text" 
                        class="form-control"
                        id="id"
                        name="project" 
                        placeholder="Project ID"
                        v-model="project">              
                    </div>
                    <div class="mb-3 mt-2 ">
                        <input 
                        type="text" 
                        class="form-control"
                        id="id"
                        name="description" 
                        placeholder="Descripción"
                        v-model="description">               
                    </div>
                    <div class="mb-3 mt-2">
                        <input
                        type="submit"
                        class="btn btn-primary"
                        >
                    </div>
                  </form>
            </div>
        </div>
    </div>
    
    
</template>
<script>
import axios from 'axios'


export default {

    data(){
        return {
            name: null,
            api_name: null,
            project: null,
            description: null,
        }
        
    },


    methods: {

        getInfo(){
            console.log(this.name)
            console.log(this.api_name)
            console.log(this.project)
            console.log(this.description)
            addLabel(this.name, this.api_name, this.project, this.description)
        },

        addLabel(name, api, project, description){
            
            axios.post('https://app.konfuzio.com/api/v3/labels/',
            {
                'name': name,
                'api_name': api,
                'project': project,
                'description': description,
                'has_multiple_top_candidates': true,
                'label_sets': []
            },{
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic ZHNhbnpoMDBAZXN0dWRpYW50ZXMudW5pbGVvbi5lczp0ZmcxMjM0NQ==',
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': 'dsLcDkJ4VmfCboSGKnceqqZaNuK7DDr7SIY2Ah44kCTkXrHxgu0QbooYC0M1ytc4'
                }
            }
            ).then(result => {
                // if(result.status === 200){
                //     alert('Añadido con éxito')
                // }
            });
        }
    }

}

</script>

<style scoped>

.card{
    border: none;
    box-shadow: 0 2px 4px black, 0 8px 16px;
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
}


</style>