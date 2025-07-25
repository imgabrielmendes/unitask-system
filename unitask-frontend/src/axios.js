import axios from 'axios';

export default {
  data() {
    return {
      tarefas: [],
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:8000/api/tarefas');
    this.tarefas = response.data;
  },
};
