<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const clientes = ref([])

const idMarca = ref('')
const idModelo = ref('')
const idVehiculo = ref('')
const idCliente = ref('')
const dias = ref('')
const fecha = ref('')
const resumen = ref(null)

const vehiculosFiltrados = ref([])

onMounted(async () => {
  const resMarcas = await fetch('http://localhost:3000/marcas')
  marcas.value = await resMarcas.json()

  const resModelos = await fetch('http://localhost:3000/modelos')
  modelos.value = await resModelos.json()

  const resVehiculos = await fetch('http://localhost:3000/vehiculos')
  vehiculos.value = await resVehiculos.json()

  const resClientes = await fetch('http://localhost:3000/clientes')
  clientes.value = await resClientes.json()
})

const modelosFiltrados = () => {
  return modelos.value.filter((m) => m.idMarca === idMarca.value)
}

const cargarVehiculos = () => {
  vehiculosFiltrados.value = vehiculos.value.filter((v) => v.idModelo === idModelo.value)
}

const alquilar = async () => {
  const cliente = clientes.value.find((c) => c.id === idCliente.value)
  const vehiculo = vehiculos.value.find((v) => v.id === idVehiculo.value)
  const modelo = modelos.value.find((m) => m.id === vehiculo.idModelo)
  const marca = marcas.value.find((m) => m.id === modelo.idMarca)

  const nuevoAlquiler = {
    idVehiculo: idVehiculo.value,
    numDias: Number(dias.value),
    fechaInic: fecha.value,
  }

  cliente.alquileres.push(nuevoAlquiler)

  await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  })

  const precioBase = vehiculo.precioDia * dias.value
  const extra = modelo.extraPorModelo || 0
  const total = precioBase + extra * dias.value

  resumen.value = {
    marca: marca.nombre,
    modelo: modelo.modelo,
    cliente: cliente.nombre,
    dni: cliente.dni,
    total,
  }

  alert('Alquiler registrado')
}
</script>

<template>
  <h1>Alquiler</h1>

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

  <button @click="cargarVehiculos" :disabled="!idModelo">Cargar vehículos</button>

  <select v-model="idVehiculo" v-if="vehiculosFiltrados.length">
    <option value="">Selecciona vehículo</option>
    <option v-for="v in vehiculosFiltrados" :key="v.id" :value="v.id">
      {{ v.precioDia }} €/día
    </option>
  </select>

  <select v-model="idCliente">
    <option value="">Selecciona cliente</option>
    <option v-for="c in clientes" :key="c.id" :value="c.id">
      {{ c.nombre }}
    </option>
  </select>

  <input type="number" v-model="dias" placeholder="Días" />

  <input type="date" v-model="fecha" />

  <button @click="alquilar">Alquilar</button>

  <div v-if="resumen">
    <h3>Resumen del alquiler</h3>

    <p>Marca: {{ resumen.marca }}</p>
    <p>Modelo: {{ resumen.modelo }}</p>
    <p>Cliente: {{ resumen.cliente }} ({{ resumen.dni }})</p>
    <p>Total: {{ resumen.total }} €</p>
  </div>
</template>
