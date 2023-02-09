<template>
  <div class="home">
    <div class="row mx-0">
      <div class="col">
        <div class="img-cont">
          <img alt="Vue logo" src="../assets/img/DrWriting.svg">
          <h2 class="text-center">
             Bienvenidos al Trabajo Final de Grado de Daniel Sanz Herrero
          </h2>
        </div>
      </div>
      <div class="col-lg-6">
        <card-comp :btns="btnArray" class="mx-auto card-comp">
          <template #default>
            <form >
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
          </form>
          </template>
          <template #footer></template>
        </card-comp>
      </div>
    </div>
  </div>
</template>

<script>
import CardComp from "../components/CardComp.vue"
import axios from 'axios'
import { ref } from 'vue';
import Popup from '../components/PopupNav.vue';

export default {
  name: 'HomeView',
  components: {
    CardComp
  },
  setup () {
		const popupTriggers = ref({
			buttonTrigger: false,
			timedTrigger: false
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

  data() {
    return  {
      btnArray:[
        {
        txt: 'Iniciar Sesión',
        class: 'btn-secondary',
        
        },
      ]
      
    }
  },
  methods: {
    login(){
        alert('Hola')
      }
  }
  
}
</script>

<style scoped>
.home {
  max-width: 895pc;
  margin: auto;
}

.card-comp {
  max-width: 398px;
  margin-top: 2.6em;
}

.img-cont {
  display: flex;
  flex-direction: column;
}

img {
  max-width: 315px;
  margin: 1em auto 0 auto;
}
h2 {
  font-size: 1.8rem;
  font-family: 'Trebuchet MS';
}

@media (min-width: 992px) {
  .home {
    margin: 4em auto;
  }
  img {
    margin-bottom: 1;
    margin-top: 5.6em;
  }
  h2 {
    font-size: 1.8rem;
    margin: 0;
    margin-top: 0.2em;
    margin-left: 0.8em;
    font-family: 'Trebuchet MS';
  }

  .card-comp {
    margin-top: 3rem;
  }
}
</style>
