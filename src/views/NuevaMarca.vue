<script setup>
import { ref } from 'vue'

const nombre = ref('')
const origen = ref('')
const anioFundacion = ref('')

const obtenerNuevoId = async () => {
  const res = await fetch('http://localhost:3000/marcas')
  const marcas = await res.json()

  if (marcas.length === 0) return '1'

  const ultimoId = Math.max(...marcas.map((m) => Number(m.id)))
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
  <h2>Nueva Marca</h2>
  <form @submit.prevent="guardarMarca">
    <input v-model="nombre" placeholder="Nombre" required />

    <input v-model="origen" placeholder="Origen" required />

    <input type="number" v-model="anioFundacion" placeholder="Año fundación" required />

    <button>Guardar</button>
  </form>
</template>
