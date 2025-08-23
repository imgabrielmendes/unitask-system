<template>

  <div v-if="isOpen" class="fixed inset-0 
                            bg-black 
                            bg-opacity-50 
                            flex justify-center gap-4">

                            <div class="bg-richBlackOne 
                                        rounded-lg 
                                        shadow-lg 
                                        p-3 gap-3 w-96">

                                        <div class="grid grid-flow-col grid-rows-2">

                                              <InputText
                                                id="inputTittleTask"
                                                label=""
                                                v-model="nome"
                                                placeholder="Informe o titulo"
                                                extra-class="placeholder-gray-400"
                                                :error="nomeErro"
                                                name="nome"
                                                maxlength="60"
                                              />
                                              
                                        </div>

                                        <div class="grid grid-flow-col grid-row-1">

                                          <p class="text-white">Responsável</p>

                                          <Select
                                                id = "selectResponseTask"
                                                placeholder="Membros"
                                                v-model="selectedFruit"
                                                :options="fruitOptions"
                                              />  

                                        </div>

                                          <div class="grid grid-flow-col grid-row-1">

                                          <p class="text-white">Data de conclusão</p>

                                          <InputDate
                                            id="dateTask"
                                            label=""
                                            v-model="dataInicio"
                                            :error="dataErro"
                                            min="2025-01-01"
                                            max="2025-12-31"
                                          /> 

                                        </div>

                                        <div class="grid grid-flow-col grid-row-2 gap-4">
                                          
                                          

                                          <Select
                                                placeholder="Tags"
                                                v-model="selectedFruit"
                                                :options="fruitOptions"
                                              /> 

                                        </div>
                                        
                                                  <p class="text-white">Descrição</p>

                                                  <Textarea
                                                  v-model="descricao"
                                                  placeholder="Descreva o problema ou observação..."
                                                  :rows="6"
                                                  :error="descricaoErro"
                                                  extra-class="placeholder-gray-400"
                                                  name="descricao"
                                                  maxlength="1000"
                                                  ref="txt"
                                                />
                                             


                                        <div class="mt-6 text-right">

                                            <button @click="close" 
                                                    class="px-4 py-2
                                                          bg-gray-300
                                                          rounded
                                                          hover:bg-gray-400">
                                                          X
                                            </button>

                                        </div>
                            </div>
  </div>

</template>

<script>
import InputText from "@/components/ui/inputs/TextInput.vue"
import InputTextarea from "@/components/ui/inputs/Textarea.vue"

import Select from "../../ui/selects/Select.vue";
import InputDate from "../../ui/inputs/InputDate.vue";

import { ref } from "vue";
// import { userRouter } from "vue-router";
import {createTask} from "@/services/TaskService";

const descricao = ref('');
const titulo = ref('');
const Tags = ref('');

async function handleSubmit(event)
{
    event.preventDefault() 
      {
        await createTask(titulo, descricao, Tags)
      }
}

export default {
  components: {
      InputText, InputTextarea, Select, InputDate
  },

  name: "CreateTaskModal",
  
  props: {
      isOpen: {type: Boolean, required: true}
    },

  emits: ['close'],

  methods: {
      close() {
        this.$emit("close");
      }
    }
};
</script>

<style>

</style>