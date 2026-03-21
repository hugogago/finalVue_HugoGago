<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const idMarca = ref('')
const modelo = ref('')
const extra = ref('')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/marcas')
  marcas.value = await res.json()
})

const obtenerNuevoId = async () => {
  const res = await fetch('http://localhost:3000/modelos')
  const modelos = await res.json()

  let ultimoId = 0

  modelos.forEach((m) => {
    if (Number(m.id) > ultimoId) {
      ultimoId = Number(m.id)
    }
  })

  return (ultimoId + 1).toString()
}

const guardarModelo = async () => {
  const nuevoId = await obtenerNuevoId()

  const nuevoModelo = {
    id: nuevoId,
    idMarca: idMarca.value,
    modelo: modelo.value,
    extraPorModelo: extra.value ? Number(extra.value) : 0,
  }

  await fetch('http://localhost:3000/modelos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoModelo),
  })

  alert('Modelo añadido')

  modelo.value = ''
  extra.value = ''
  idMarca.value = ''
}
</script>

<template>
  <div class="form-container">
    <h2>Nuevo Modelo</h2>

    <form @submit.prevent="guardarModelo">
      <select v-model="idMarca" required>
        <option value="">Selecciona marca</option>

        <option v-for="m in marcas" :key="m.id" :value="m.id">
          {{ m.nombre }}
        </option>
      </select>

      <input v-model="modelo" placeholder="Nombre del modelo" required />

      <input type="number" v-model="extra" placeholder="Extra por modelo" />

      <button>Guardar</button>
    </form>
  </div>
</template>
<style scoped>
.form-container {
  background-color: white;
  padding: 20px;
  max-width: 300px;
  border: 1px solid #ddd;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input {
  margin-top: 5px;
  padding: 6px;
}

button {
  margin-top: 15px;
  padding: 8px;
}
</style>
