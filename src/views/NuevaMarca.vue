<script setup>
import { ref } from 'vue'

const nombre = ref('')
const origen = ref('')
const anioFundacion = ref('')

const obtenerNuevoId = async () => {
  const res = await fetch('http://localhost:3000/marcas')
  const data = await res.json()

  let ultimoId = 0

  data.forEach((m) => {
    if (Number(m.id) > ultimoId) {
      ultimoId = Number(m.id)
    }
  })

  return (ultimoId + 1).toString()
}

const guardarMarca = async () => {
  const nuevoId = await obtenerNuevoId()

  const nuevaMarca = {
    id: nuevoId,
    nombre: nombre.value,
    origen: origen.value,
    anioFundacion: Number(anioFundacion.value),
  }

  await fetch('http://localhost:3000/marcas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevaMarca),
  })

  alert('Marca añadida')

  nombre.value = ''
  origen.value = ''
  anioFundacion.value = ''
}
</script>

<template>
  <div class="form-container">
    <h2>Nueva Marca</h2>

    <form @submit.prevent="guardarMarca">
      <label>Nombre</label>
      <input v-model="nombre" required />

      <label>Origen</label>
      <input v-model="origen" required />

      <label>Año fundación</label>
      <input type="number" v-model="anioFundacion" required />

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
