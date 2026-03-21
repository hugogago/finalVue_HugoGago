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
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.contenido {
  flex: 1;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

input,
select {
  margin: 5px 0;
  padding: 6px;
  width: 200px;
}

button {
  margin: 5px 5px 5px 0;
  padding: 6px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
}

button:hover {
  background-color: #eaeaea;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
