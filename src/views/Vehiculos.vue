<script setup>
import { ref, onMounted } from 'vue'
import NuevoVehiculo from '@/views/NuevoVehiculo.vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const clientes = ref([])

const idMarca = ref('')
const idModelo = ref('')

const mostrarFormulario = ref(false)

onMounted(async () => {
  await cargarDatos()
})

const cargarDatos = async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()

  const resVehiculos = await fetch('http://localhost:3000/vehiculos')
  vehiculos.value = await resVehiculos.json()

  const resClientes = await fetch('http://localhost:3000/clientes')
  clientes.value = await resClientes.json()
}

const modelosFiltrados = () => {
  return modelos.value.filter((m) => m.idMarca === idMarca.value)
}

const vehiculosFiltrados = () => {
  if (!idMarca.value) {
    return vehiculos.value
  }

  if (idMarca.value && !idModelo.value) {
    const modelosMarca = modelosFiltrados().map((m) => m.id)
    return vehiculos.value.filter((v) => modelosMarca.includes(v.idModelo))
  }

  return vehiculos.value.filter((v) => v.idModelo === idModelo.value)
}

const getModelo = (idModelo) => {
  return modelos.value.find((m) => m.id === idModelo)
}

const clientesPorVehiculo = (idVehiculo) => {
  let resultado = []

  clientes.value.forEach((c) => {
    c.alquileres.forEach((a) => {
      if (a.idVehiculo === idVehiculo) {
        resultado.push(c.nombre)
      }
    })
  })

  return resultado
}

const abrirFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value
}
</script>

<template>
  <h1>Vehículos</h1>

  <select v-model="idMarca">
    <option value="">Selecciona marca</option>
    <option v-for="m in marcas" :key="m.id" :value="m.id">
      {{ m.nombre }}
    </option>
  </select>

  <select v-model="idModelo" :disabled="!idMarca">
    <option value="">Selecciona modelo</option>
    <option v-for="m in modelosFiltrados()" :key="m.id" :value="m.id">
      {{ m.modelo }}
    </option>
  </select>

  <ul>
    <li v-for="v in vehiculosFiltrados()" :key="v.id">
      <strong> {{ getModelo(v.idModelo)?.modelo }} - {{ v.precioDia }} €/día </strong>

      <div>
        Clientes:

        <span v-if="clientesPorVehiculo(v.id).length === 0"> Ninguno </span>

        <ul v-else>
          <li v-for="c in clientesPorVehiculo(v.id)" :key="c">
            {{ c }}
          </li>
        </ul>
      </div>
    </li>
  </ul>

  <button @click="abrirFormulario">
    {{ mostrarFormulario ? 'Cerrar' : 'Nuevo Vehículo' }}
  </button>

  <div v-if="mostrarFormulario">
    <NuevoVehiculo />
  </div>
</template>
