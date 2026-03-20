<script setup>
import { ref, onMounted } from 'vue'

const clientes = ref([])
const clienteSeleccionado = ref(null)

const nombre = ref('')
const dni = ref('')

const cargarClientes = async () => {
  const res = await fetch('http://localhost:3000/clientes')
  clientes.value = await res.json()
}

onMounted(async () => {
  await cargarClientes()
})

const seleccionarCliente = (c) => {
  clienteSeleccionado.value = c
  nombre.value = c.nombre
  dni.value = c.dni
}

const obtenerNuevoId = async () => {
  const res = await fetch('http://localhost:3000/clientes')
  const data = await res.json()

  let ultimoId = 0

  data.forEach((c) => {
    if (Number(c.id) > ultimoId) {
      ultimoId = Number(c.id)
    }
  })

  return (ultimoId + 1).toString()
}

const crearCliente = async () => {
  const nuevoId = await obtenerNuevoId()

  const nuevoCliente = {
    id: nuevoId,
    nombre: nombre.value,
    dni: dni.value,
    alquileres: [],
  }

  await fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoCliente),
  })

  await cargarClientes()

  alert('Cliente añadido')

  limpiarFormulario()
}

const modificarCliente = async () => {
  const clienteModificado = {
    ...clienteSeleccionado.value,
    nombre: nombre.value,
    dni: dni.value,
  }

  await fetch(`http://localhost:3000/clientes/${clienteSeleccionado.value.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clienteModificado),
  })

  await cargarClientes()

  alert('Cliente modificado')

  limpiarFormulario()
}

const eliminarCliente = async () => {
  await fetch(`http://localhost:3000/clientes/${clienteSeleccionado.value.id}`, {
    method: 'DELETE',
  })

  await cargarClientes()

  alert('Cliente eliminado')

  limpiarFormulario()
}

const limpiarFormulario = () => {
  nombre.value = ''
  dni.value = ''
  clienteSeleccionado.value = null
}
</script>

<template>
  <h1>Clientes</h1>

  <div style="display: flex">
    <div style="width: 40%">
      <ul>
        <li
          v-for="c in clientes"
          :key="c.id"
          @click="seleccionarCliente(c)"
          style="cursor: pointer"
        >
          {{ c.nombre }}
        </li>
      </ul>
    </div>

    <div style="width: 60%">
      <div v-if="clienteSeleccionado">
        <h3>Alquileres</h3>

        <ul>
          <li v-for="a in clienteSeleccionado.alquileres" :key="a.idVehiculo">
            Vehículo {{ a.idVehiculo }} - {{ a.numDias }} días
          </li>
        </ul>
      </div>

      <h3>Nuevo / Editar Cliente</h3>

      <input v-model="nombre" placeholder="Nombre" />
      <input v-model="dni" placeholder="DNI" />

      <br /><br />

      <button @click="crearCliente" :disabled="clienteSeleccionado">Alta</button>

      <button @click="modificarCliente" :disabled="!clienteSeleccionado">Modificar</button>

      <button @click="eliminarCliente" :disabled="!clienteSeleccionado">Eliminar</button>
    </div>
  </div>
</template>
