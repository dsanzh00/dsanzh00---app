<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>
                        <td>
                            <button class="btn btn-secondary" onclick="location.href='http://localhost:8080/documents'">
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
                <form v-on:submit="addDoc()">
                    <div class="mb-3 mt-2 ">
                      <input 
                      type="text" 
                      class="form-control"
                      id="id"
                      name="id" 
                      placeholder="Project ID"
                      v-model="id">              
                    </div>
                    <div class="mb-3 mt-2">
                      <input 
                      type="file" 
                      id="myfile" 
                      name="file" 
                      class="form-control" 
                      multiple
                      @change="onFileChange">
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
import axios from 'axios';
export default {
    data(){
        return{ id:null, file:null, image:''}
    },
     
    methods:{
        addDoc(){
            // console.log(this.id +', '+ this.image)
            // alert(this.id +', '+ this.image)
            const form = new FormData();
                form.append('project', this.id);
                form.append('data_file', fs.readFileSync(this.image), this.image);
                form.append('category', '');
                form.append('callback_url', '');
                form.append('callback_status_code', '');
                form.append('sync', '');
                form.append('assignee', '');

                axios.post(
                    'https://app.konfuzio.com/api/v3/documents/',
                    form,
                    {
                        headers: {
                            ...form.getHeaders(),
                            'accept': 'application/json',
                            'Authorization': 'Basic ZHNhbnpoMDBAZXN0dWRpYW50ZXMudW5pbGVvbi5lczp0ZmcxMjM0NQ==',
                            'Content-Type': 'multipart/form-data',
                            'X-CSRFTOKEN': 'dsLcDkJ4VmfCboSGKnceqqZaNuK7DDr7SIY2Ah44kCTkXrHxgu0QbooYC0M1ytc4'
                        }
                    }
                ).then(
                    result => {
                        alert('Añadido')
                    }
                ).catch(error => console.log(error));  
        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
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
