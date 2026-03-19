<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])

const idMarcaSeleccionada = ref('')
const idModeloSeleccionado = ref('')

onMounted(async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()

  const resVehiculos = await fetch('http://localhost:3000/vehiculos')
  vehiculos.value = await resVehiculos.json()
})

const modelosFiltrados = () => {
  return modelos.value.filter((m) => m.idMarca === idMarcaSeleccionada.value)
}

const vehiculosFiltrados = () => {
  if (!idMarcaSeleccionada.value) {
    return vehiculos.value
  }

  if (idMarcaSeleccionada.value && !idModeloSeleccionado.value) {
    const modelosMarca = modelosFiltrados().map((m) => m.id)
    return vehiculos.value.filter((v) => modelosMarca.includes(v.idModelo))
  }

  return vehiculos.value.filter((v) => v.idModelo === idModeloSeleccionado.value)
}
</script>

<template>
  <h1>Vehículos</h1>

  <select v-model="idMarcaSeleccionada">
    <option value="">Selecciona marca</option>

    <option v-for="m in marcas" :key="m.id" :value="m.id">
      {{ m.nombre }}
    </option>
  </select>

  <select v-model="idModeloSeleccionado" :disabled="!idMarcaSeleccionada">
    <option value="">Selecciona modelo</option>

    <option v-for="m in modelosFiltrados()" :key="m.id" :value="m.id">
      {{ m.modelo }}
    </option>
  </select>

  <ul>
    <li v-for="v in vehiculosFiltrados()" :key="v.id">
      Modelo ID: {{ v.idModelo }} - {{ v.precioDia }} €/día
    </li>
  </ul>
</template>
