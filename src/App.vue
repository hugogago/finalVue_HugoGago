<script setup>
import MenuLateral from './components/MenuLateral.vue'
</script>

<template>
  <div class="layout">
    <MenuLateral />

    <div class="contenido">
      <router-view />
    </div>
  </div>
</template>

<style>
.layout {
  display: flex;
}

.contenido {
  padding: 20px;
  width: 100%;
}
</style>
