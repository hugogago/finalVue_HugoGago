<script setup>
import { ref, onMounted } from 'vue'

const marcas = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/marcas')
  marcas.value = await res.json()
})
</script>

<template>
  <h1>Marcas</h1>

  <ul>
    <li v-for="m in marcas" :key="m.id">{{ m.nombre }} - {{ m.origen }} ({{ m.anioFundacion }})</li>
  </ul>
</template>
