<template>
  <nav class="menu">
    <h2>Renting</h2>

    <ul>
      <li><router-link to="/">Inicio</router-link></li>

      <li><router-link to="/marcas">Marcas</router-link></li>
      <li><router-link to="/marcas/nueva">Nueva Marca</router-link></li>

      <li><router-link to="/modelos">Modelos</router-link></li>
      <li><router-link to="/modelos/nuevo">Nuevo Modelo</router-link></li>

      <li><router-link to="/vehiculos">Vehículos</router-link></li>
      <li><router-link to="/vehiculos/nuevo">Nuevo Vehículo</router-link></li>

      <li><router-link to="/alquiler">Alquiler</router-link></li>

      <li><router-link to="/clientes">Clientes</router-link></li>
    </ul>
  </nav>
</template>

<style>
.menu {
  width: 200px;
  background: #eee;
  height: 100vh;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
