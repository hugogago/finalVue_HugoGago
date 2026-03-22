<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const clientes = ref([])

const idMarca = ref('')
const idModelo = ref('')

const vehiculosFiltrados = ref([])

const idVehiculo = ref('')
const idCliente = ref('')
const numDias = ref('')
const fecha = ref('')

const resumen = ref('')

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

const buscarVehiculos = () => {
  vehiculosFiltrados.value = vehiculos.value.filter((v) => v.idModelo === idModelo.value)
}

const alquilar = async () => {
  const cliente = clientes.value.find((c) => c.id === idCliente.value)

  const nuevoAlquiler = {
    idVehiculo: idVehiculo.value,
    numDias: Number(numDias.value),
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

  const vehiculo = vehiculos.value.find((v) => v.id === idVehiculo.value)
  const modelo = modelos.value.find((m) => m.id === vehiculo.idModelo)
  const marca = marcas.value.find((m) => m.id === modelo.idMarca)

  let precio = vehiculo.precioDia * numDias.value

  if (modelo.extraPorModelo && modelo.extraPorModelo > 0) {
    precio += modelo.extraPorModelo * numDias.value
  }

  resumen.value = `${marca.nombre} ${modelo.modelo} - ${cliente.nombre} (${cliente.dni}) - ${precio}€`
}
</script>

<template>
  <h1>Alquiler</h1>

  <div>
    <select v-model="idMarca">
      <option value="">Marca</option>
      <option v-for="m in marcas" :key="m.id" :value="m.id">
        {{ m.nombre }}
      </option>
    </select>

    <select v-model="idModelo" :disabled="!idMarca">
      <option value="">Modelo</option>
      <option v-for="m in modelosFiltrados()" :key="m.id" :value="m.id">
        {{ m.modelo }}
      </option>
    </select>

    <button @click="buscarVehiculos" :disabled="!idMarca || !idModelo">Buscar</button>
  </div>

  <div v-if="vehiculosFiltrados.length">
    <select v-model="idVehiculo">
      <option value="">Vehículo</option>
      <option v-for="v in vehiculosFiltrados" :key="v.id" :value="v.id">
        {{ v.precioDia }} €/día
      </option>
    </select>

    <select v-model="idCliente">
      <option value="">Cliente</option>
      <option v-for="c in clientes" :key="c.id" :value="c.id">
        {{ c.nombre }}
      </option>
    </select>

    <input type="number" v-model="numDias" placeholder="Días" />
    <input type="date" v-model="fecha" />

    <button @click="alquilar">Alquilar</button>
  </div>

  <div v-if="resumen">
    <h3>Resumen</h3>
    <p>{{ resumen }}</p>
  </div>
</template>
