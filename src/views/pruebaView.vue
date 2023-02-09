<template>
    <div class="row">
        <div class="col">
            <div class="card mt-4 col-lg-6">
                <form v-on:submit="login">
                    <div class="mb-3 mt-2">
                      <input 
                      type="email" 
                      class="form-control"
                      id="mail"
                      placeholder="Correo electrónico"
                      v-model="email">
                      
                    </div>
                    <div class="mb-3 mt-2">
                      <input 
                      type="password" 
                      class="form-control" 
                      id="pass"
                      placeholder="Contraseña"
                      v-model="pass">
                    </div>
                    <div class="mb-3 mt-2">
                        <input
                        type="submit"
                        class="btn btn-primary"/>
                        
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
        return{ email:null, pass:null}
    },
    methods:{
        login(){
            alert("'"+this.email+"'")
            axios.post('https://app.konfuzio.com/api/v3/auth/', new URLSearchParams({
            'username': this.email,
            'password': 'tfg12345'}))
            .then(
                result => {
                    console.log(result.data);
                    console.log(result.data.token);
                    if(result.status === 200){
                       console.log('200 ok')
                    }
                }

                
            );
        }, 

        inicio(){
            console.log('Bienvenido')
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
