<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])
const idMarcaSeleccionada = ref('')

onMounted(async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()
})

const modelosFiltrados = () => {
  return modelos.value.filter((m) => m.idMarca === idMarcaSeleccionada.value)
}

const actualizarExtra = async (modelo) => {
  await fetch(`http://localhost:3000/modelos/${modelo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modelo),
  })

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()

  alert('Extra actualizado')
}
</script>

<template>
  <h1>Modelos</h1>

  <select v-model="idMarcaSeleccionada">
    <option value="">Selecciona marca</option>

    <option v-for="m in marcas" :key="m.id" :value="m.id">
      {{ m.nombre }}
    </option>
  </select>

  <ul v-if="idMarcaSeleccionada">
    <li v-for="m in modelosFiltrados()" :key="m.id">
      {{ m.modelo }} - Extra:

      <span v-if="m.extraPorModelo > 0"> {{ m.extraPorModelo }} € </span>

      <span v-else>
        <input type="number" v-model="m.extraPorModelo" />
        <button @click="actualizarExtra(m)">Guardar</button>
      </span>
    </li>
  </ul>
</template>
