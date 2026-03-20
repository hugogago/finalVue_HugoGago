<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])

const idMarca = ref('')
const idModelo = ref('')
const precioDia = ref('')
const puertas = ref('')
const sillaInfantil = ref(false)

onMounted(async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()
})

const modelosFiltrados = () => {
  return modelos.value.filter((m) => m.idMarca === idMarca.value)
}

const obtenerNuevoId = async () => {
  const res = await fetch('http://localhost:3000/vehiculos')
  const data = await res.json()

  let ultimoId = 0

  data.forEach((v) => {
    if (Number(v.id) > ultimoId) {
      ultimoId = Number(v.id)
    }
  })

  return (ultimoId + 1).toString()
}

const guardarVehiculo = async () => {
  const nuevoId = await obtenerNuevoId()

  const nuevoVehiculo = {
    id: nuevoId,
    idModelo: idModelo.value,
    precioDia: Number(precioDia.value),
    puertas: Number(puertas.value),
    sillaInfantil: sillaInfantil.value,
  }

  await fetch('http://localhost:3000/vehiculos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoVehiculo),
  })

  alert('Vehículo añadido')
}
</script>

<template>
  <h1>Nuevo Vehículo</h1>

  <form @submit.prevent="guardarVehiculo">
    <select v-model="idMarca" required>
      <option value="">Marca</option>
      <option v-for="m in marcas" :key="m.id" :value="m.id">
        {{ m.nombre }}
      </option>
    </select>

    <select v-model="idModelo" :disabled="!idMarca" required>
      <option value="">Modelo</option>
      <option v-for="m in modelosFiltrados()" :key="m.id" :value="m.id">
        {{ m.modelo }}
      </option>
    </select>

    <input type="number" v-model="precioDia" placeholder="Precio día" required />

    <input type="number" v-model="puertas" placeholder="Puertas" required />

    <label>
      Silla infantil
      <input type="checkbox" v-model="sillaInfantil" />
    </label>

    <button>Guardar</button>
  </form>
</template>
