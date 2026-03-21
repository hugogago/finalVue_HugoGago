<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])

const marcaSeleccionada = ref(null)

onMounted(async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()

  const resVehiculos = await fetch('http://localhost:3000/vehiculos')
  vehiculos.value = await resVehiculos.json()
})

const precioMedioMarca = (idMarca) => {
  const modelosMarca = modelos.value.filter((m) => m.idMarca === idMarca)

  let precios = []

  modelosMarca.forEach((m) => {
    vehiculos.value.forEach((v) => {
      if (v.idModelo === m.id) {
        precios.push(v.precioDia)
      }
    })
  })

  if (precios.length === 0) return 0

  const suma = precios.reduce((a, b) => a + b, 0)
  return (suma / precios.length).toFixed(2)
}

const marcasOrdenadas = () => {
  const copia = marcas.value.slice()

  return copia.sort((a, b) => {
    return precioMedioMarca(b.id) - precioMedioMarca(a.id)
  })
}

const seleccionarMarca = (m) => {
  marcaSeleccionada.value = m
}

const modelosDeMarca = () => {
  if (!marcaSeleccionada.value) return []
  return modelos.value.filter((m) => m.idMarca === marcaSeleccionada.value.id)
}

const precioModelo = (idModelo) => {
  const precios = vehiculos.value.filter((v) => v.idModelo === idModelo).map((v) => v.precioDia)

  if (precios.length === 0) return 0

  const suma = precios.reduce((a, b) => a + b, 0)
  return (suma / precios.length).toFixed(2)
}
</script>

<template>
  <h1>Marcas</h1>

  <div class="container">
    <div class="lista">
      <ul>
        <li
          v-for="m in marcasOrdenadas()"
          :key="m.id"
          @click="seleccionarMarca(m)"
          style="cursor: pointer"
        >
          {{ m.nombre }} ({{ precioMedioMarca(m.id) }} €/día)
        </li>
      </ul>
    </div>

    <div class="detalle">
      <div v-if="marcaSeleccionada">
        <h3>Modelos de {{ marcaSeleccionada.nombre }}</h3>

        <ul>
          <li v-for="m in modelosDeMarca()" :key="m.id">
            {{ m.modelo }} - {{ precioModelo(m.id) }} €/día
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  margin-bottom: 20px;
}

.container {
  display: flex;
}

.lista {
  width: 40%;
}

.detalle {
  width: 60%;
}

li {
  cursor: pointer;
  margin: 5px 0;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
